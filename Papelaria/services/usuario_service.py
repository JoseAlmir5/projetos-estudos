
from werkzeug.security import generate_password_hash, check_password_hash
from conexao import conectar


def cadastrar_usuario(nome, email, senha):
    nome = nome.strip()
    email = email.strip().lower()

    if not nome or not email or not senha:
        return {
            "erro": "Todos os campos são obrigatórios."
        }, 400

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id FROM USUARIO WHERE email = %s",
            (email,)
        )

        if cursor.fetchone():
            return {
                "erro": "Este e-mail já está cadastrado."
            }, 409

        senha_hash = generate_password_hash(senha)

        cursor.execute("""
            INSERT INTO USUARIO (nome, email, senha, tipo)
            VALUES (%s, %s, %s, 'cliente')
        """, (nome, email, senha_hash))

        usuario_id = cursor.lastrowid
        conexao.commit()

        return {
            "mensagem": "Usuário cadastrado com sucesso!",
            "usuario": {
                "id": usuario_id,
                "nome": nome,
                "email": email
            }
        }, 201

    finally:
        cursor.close()
        conexao.close()


def autenticar_usuario(email, senha):
    email = email.strip().lower()

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT id, nome, email, senha, tipo
            FROM USUARIO
            WHERE email = %s
        """, (email,))

        usuario = cursor.fetchone()

        if usuario is None:
            return None

        if not check_password_hash(usuario["senha"], senha):
            return None

        return {
            "id": usuario["id"],
            "nome": usuario["nome"],
            "email": usuario["email"],
            "tipo": usuario["tipo"]
        }

    finally:
        cursor.close()
        conexao.close()


def cadastrar_administrador(nome, email, senha):
    nome = nome.strip()
    email = email.strip().lower()

    if not nome or not email or not senha:
        raise ValueError("Todos os campos são obrigatórios.")

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id FROM USUARIO WHERE email = %s",
            (email,)
        )

        if cursor.fetchone():
            raise ValueError("Este e-mail já está cadastrado.")

        senha_hash = generate_password_hash(senha)

        cursor.execute("""
            INSERT INTO USUARIO (nome, email, senha, tipo)
            VALUES (%s, %s, %s, 'admin')
        """, (nome, email, senha_hash))

        administrador = {
            "id": cursor.lastrowid,
            "nome": nome,
            "email": email,
            "tipo": "admin"
        }

        conexao.commit()

        return administrador

    finally:
        cursor.close()
        conexao.close()
