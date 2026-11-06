
from conexao import conectar
from decimal import Decimal


def finalizar_pedido(carrinho, usuario):

    if not carrinho:
        return {
            "erro": "O carrinho está vazio."
        }, 400

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        itens_pedido = []
        valor_total = Decimal("0.00")

        # Inicia uma transação no banco.
        conexao.start_transaction()

        # Verifica os produtos e bloqueia suas linhas
        # para evitar vendas simultâneas do mesmo estoque.
        for produto_id, quantidade in carrinho.items():

            if (
                not isinstance(quantidade, int)
                or isinstance(quantidade, bool)
                or quantidade <= 0
            ):
                raise ValueError("Quantidade inválida no carrinho.")

            cursor.execute("""
                SELECT
                    p.id,
                    p.nome,
                    p.preco,
                    p.estoque
                FROM PRODUTO p
                WHERE p.id = %s
                FOR UPDATE
            """, (int(produto_id),))

            produto = cursor.fetchone()

            if produto is None:
                raise ValueError(
                    f"O produto {produto_id} não foi encontrado."
                )

            if produto["estoque"] <= 0:
                raise ValueError(
                    f'O produto "{produto["nome"]}" está sem estoque.'
                )

            if quantidade > produto["estoque"]:
                raise ValueError(
                    f'Estoque insuficiente para "{produto["nome"]}". '
                    f'Estoque disponível: {produto["estoque"]}.'
                )

            preco_unitario = Decimal(str(produto["preco"]))
            subtotal = preco_unitario * quantidade
            valor_total += subtotal

            itens_pedido.append({
                "produto_id": produto["id"],
                "nome": produto["nome"],
                "preco_unitario": preco_unitario,
                "quantidade": quantidade,
                "subtotal": subtotal
            })

        # Registra o pedido.
        cursor.execute("""
            INSERT INTO PEDIDO (usuario_id, valor_total, status)
            VALUES (%s, %s, 'Pendente')
        """, (usuario["id"], valor_total))

        pedido_id = cursor.lastrowid

        # Registra cada produto comprado e atualiza o estoque.
        for item in itens_pedido:

            cursor.execute("""
                INSERT INTO ITEM_PEDIDO
                (pedido_id, produto_id, quantidade, preco)
                VALUES (%s, %s, %s, %s)
            """, (
                pedido_id,
                item["produto_id"],
                item["quantidade"],
                item["preco_unitario"]
            ))

            cursor.execute("""
                UPDATE PRODUTO
                SET estoque = estoque - %s
                WHERE id = %s
            """, (
                item["quantidade"],
                item["produto_id"]
            ))

        # Confirma todas as operações juntas.
        conexao.commit()

        pedido = {
            "id": pedido_id,
            "usuario_id": usuario["id"],
            "itens": itens_pedido,
            "valor_total": valor_total,
            "status": "Pendente"
        }

        # Limpa o carrinho somente depois da confirmação.
        carrinho.clear()

        return {
            "mensagem": "Pedido finalizado com sucesso!",
            "pedido": pedido
        }, 201

    except ValueError as erro:
        conexao.rollback()

        return {
            "erro": str(erro)
        }, 409

    except Exception:
        conexao.rollback()
        raise

    finally:
        cursor.close()
        conexao.close()

def listar_pedidos_usuario(usuario_id):
    return _listar_pedidos(usuario_id)


def listar_todos_pedidos():
    return _listar_pedidos()


def _listar_pedidos(usuario_id=None):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        sql = """
            SELECT
                p.id AS pedido_id,
                p.usuario_id,
                p.data,
                p.valor_total,
                p.status,
                ip.produto_id,
                pr.nome AS produto_nome,
                ip.quantidade,
                ip.preco
            FROM PEDIDO p
            LEFT JOIN ITEM_PEDIDO ip
                ON p.id = ip.pedido_id
            LEFT JOIN PRODUTO pr
                ON ip.produto_id = pr.id
        """

        parametros = ()

        if usuario_id is not None:
            sql += " WHERE p.usuario_id = %s"
            parametros = (usuario_id,)

        sql += " ORDER BY p.id DESC"

        cursor.execute(sql, parametros)
        resultados = cursor.fetchall()

        pedidos_encontrados = {}

        for linha in resultados:
            pedido_id = linha["pedido_id"]

            if pedido_id not in pedidos_encontrados:
                pedidos_encontrados[pedido_id] = {
                    "id": pedido_id,
                    "usuario_id": linha["usuario_id"],
                    "data": linha["data"],
                    "valor_total": linha["valor_total"],
                    "status": linha["status"],
                    "itens": []
                }

            if linha["produto_id"] is not None:
                pedidos_encontrados[pedido_id]["itens"].append({
                    "produto_id": linha["produto_id"],
                    "nome": linha["produto_nome"],
                    "quantidade": linha["quantidade"],
                    "preco_unitario": linha["preco"]
                })

        return list(pedidos_encontrados.values())

    finally:
        cursor.close()
        conexao.close()

