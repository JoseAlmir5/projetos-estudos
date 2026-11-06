
from conexao import conectar


def listar_produtos():
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            c.nome AS categoria,
            p.estoque
        FROM PRODUTO p
        INNER JOIN CATEGORIA c ON p.categoria_id = c.id
        ORDER BY p.id
    """)

    produtos = cursor.fetchall()

    cursor.close()
    conexao.close()

    return produtos


def listar_categorias():
    conexao = conectar()
    cursor = conexao.cursor()

    cursor.execute("SELECT nome FROM CATEGORIA ORDER BY nome")

    categorias = [linha[0] for linha in cursor.fetchall()]

    cursor.close()
    conexao.close()

    return categorias


def listar_produtos_por_categoria(categoria):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            c.nome AS categoria,
            p.estoque
        FROM PRODUTO p
        INNER JOIN CATEGORIA c ON p.categoria_id = c.id
        WHERE LOWER(c.nome) = LOWER(%s)
        ORDER BY p.id
    """, (categoria,))

    produtos = cursor.fetchall()

    cursor.close()
    conexao.close()

    return produtos


def buscar_produtos(termo):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    termo_busca = f"%{termo.strip()}%"

    cursor.execute("""
        SELECT
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            c.nome AS categoria,
            p.estoque
        FROM PRODUTO p
        INNER JOIN CATEGORIA c ON p.categoria_id = c.id
        WHERE p.nome LIKE %s OR p.descricao LIKE %s
        ORDER BY p.id
    """, (termo_busca, termo_busca))

    produtos = cursor.fetchall()

    cursor.close()
    conexao.close()

    return produtos


def buscar_produto_por_id(produto_id):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            p.id,
            p.nome,
            p.descricao,
            p.preco,
            c.nome AS categoria,
            p.estoque
        FROM PRODUTO p
        INNER JOIN CATEGORIA c ON p.categoria_id = c.id
        WHERE p.id = %s
    """, (produto_id,))

    produto = cursor.fetchone()

    cursor.close()
    conexao.close()

    return produto


def cadastrar_produto(nome, descricao, preco, categoria, estoque):
    if not isinstance(nome, str) or not nome.strip():
        raise ValueError("O nome do produto é obrigatório.")

    if not isinstance(descricao, str) or not descricao.strip():
        raise ValueError("A descrição do produto é obrigatória.")

    if not isinstance(categoria, str) or not categoria.strip():
        raise ValueError("A categoria do produto é obrigatória.")

    if isinstance(preco, bool) or not isinstance(preco, (int, float)):
        raise ValueError("O preço deve ser um número.")

    if preco <= 0:
        raise ValueError("O preço deve ser maior que zero.")

    if isinstance(estoque, bool) or not isinstance(estoque, int):
        raise ValueError("O estoque deve ser um número inteiro.")

    if estoque < 0:
        raise ValueError("O estoque não pode ser negativo.")

    conexao = conectar()
    cursor = conexao.cursor()

    cursor.execute("""
        SELECT id FROM CATEGORIA
        WHERE LOWER(nome) = LOWER(%s)
    """, (categoria.strip(),))

    resultado = cursor.fetchone()

    if resultado is None:
        cursor.close()
        conexao.close()
        raise ValueError("Categoria não encontrada.")

    categoria_id = resultado[0]

    cursor.execute("""
        INSERT INTO PRODUTO (nome, descricao, preco, estoque, categoria_id)
        VALUES (%s, %s, %s, %s, %s)
    """, (nome.strip(), descricao.strip(), preco, estoque, categoria_id))

    produto_id = cursor.lastrowid

    conexao.commit()
    cursor.close()
    conexao.close()

    return buscar_produto_por_id(produto_id)


def editar_produto(produto_id, dados):
    produto = buscar_produto_por_id(produto_id)

    if produto is None:
        raise ValueError("Produto não encontrado.")

    campos_permitidos = ["nome", "descricao", "preco", "estoque", "categoria"]

    for campo in dados:
        if campo not in campos_permitidos:
            raise ValueError("Campo inválido.")

    if "nome" in dados:
        if not isinstance(dados["nome"], str) or not dados["nome"].strip():
            raise ValueError("O nome do produto não pode ser vazio.")

    if "descricao" in dados:
        if not isinstance(dados["descricao"], str) or not dados["descricao"].strip():
            raise ValueError("A descrição não pode ser vazia.")

    if "preco" in dados:
        preco = dados["preco"]

        if isinstance(preco, bool) or not isinstance(preco, (int, float)):
            raise ValueError("O preço deve ser um número.")

        if preco <= 0:
            raise ValueError("O preço deve ser maior que zero.")

    if "estoque" in dados:
        estoque = dados["estoque"]

        if isinstance(estoque, bool) or not isinstance(estoque, int):
            raise ValueError("O estoque deve ser um número inteiro.")

        if estoque < 0:
            raise ValueError("O estoque não pode ser negativo.")

    conexao = conectar()
    cursor = conexao.cursor()

    atualizacoes = []
    valores = []

    for campo in ["nome", "descricao", "preco", "estoque"]:
        if campo in dados:
            atualizacoes.append(f"{campo} = %s")
            valores.append(dados[campo].strip() if isinstance(dados[campo], str) else dados[campo])

    if "categoria" in dados:
        cursor.execute("""
            SELECT id FROM CATEGORIA
            WHERE LOWER(nome) = LOWER(%s)
        """, (dados["categoria"].strip(),))

        resultado = cursor.fetchone()

        if resultado is None:
            cursor.close()
            conexao.close()
            raise ValueError("Categoria não encontrada.")

        atualizacoes.append("categoria_id = %s")
        valores.append(resultado[0])

    if atualizacoes:
        valores.append(produto_id)

        sql = f"""
            UPDATE PRODUTO
            SET {", ".join(atualizacoes)}
            WHERE id = %s
        """

        cursor.execute(sql, valores)
        conexao.commit()

    cursor.close()
    conexao.close()

    return buscar_produto_por_id(produto_id)


def excluir_produto(produto_id):
    produto = buscar_produto_por_id(produto_id)

    if produto is None:
        raise ValueError("Produto não encontrado.")

    conexao = conectar()
    cursor = conexao.cursor()

    try:
        cursor.execute(
            "DELETE FROM PRODUTO WHERE id = %s",
            (produto_id,)
        )

        conexao.commit()

    except Exception:
        conexao.rollback()
        raise ValueError(
            "Não foi possível excluir o produto. "
            "Ele pode estar vinculado a um pedido."
        )

    finally:
        cursor.close()
        conexao.close()

    return produto
