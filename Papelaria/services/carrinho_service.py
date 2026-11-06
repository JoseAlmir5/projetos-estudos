
from services.produto_service import buscar_produto_por_id


def adicionar_ao_carrinho(carrinho, produto_id, quantidade=1):
    produto = buscar_produto_por_id(produto_id)

    if produto is None:
        return {
            "erro": "Produto não encontrado."
        }, 404

    if produto["estoque"] <= 0:
        return {
            "erro": "Este produto está sem estoque."
        }, 409

    if not isinstance(quantidade, int) or isinstance(quantidade, bool) or quantidade <= 0:
        return {
            "erro": "A quantidade deve ser um número inteiro positivo."
        }, 400

    quantidade_atual = carrinho.get(str(produto_id), 0)
    nova_quantidade = quantidade_atual + quantidade

    if nova_quantidade > produto["estoque"]:
        return {
            "erro": "Quantidade solicitada maior que o estoque disponível.",
            "estoque_disponivel": produto["estoque"],
            "quantidade_no_carrinho": quantidade_atual
        }, 409

    carrinho[str(produto_id)] = nova_quantidade

    return {
        "mensagem": "Produto adicionado ao carrinho!",
        "produto": produto["nome"],
        "quantidade": nova_quantidade
    }, 200


def consultar_carrinho(carrinho):
    itens = []
    total = 0

    for produto_id, quantidade in carrinho.items():
        produto = buscar_produto_por_id(int(produto_id))

        if produto is None:
            continue

        subtotal = round(produto["preco"] * quantidade, 2)
        total += subtotal

        itens.append({
            "produto_id": produto["id"],
            "nome": produto["nome"],
            "preco_unitario": produto["preco"],
            "quantidade": quantidade,
            "subtotal": subtotal
        })

    return {
        "itens": itens,
        "total_itens": sum(item["quantidade"] for item in itens),
        "valor_total": round(total, 2)
    }


def alterar_quantidade(carrinho, produto_id, quantidade):
    produto = buscar_produto_por_id(produto_id)

    if produto is None:
        return {
            "erro": "Produto não encontrado."
        }, 404

    if (
        not isinstance(quantidade, int)
        or isinstance(quantidade, bool)
        or quantidade <= 0
    ):
        return {
            "erro": "A quantidade deve ser um número inteiro positivo."
        }, 400

    chave = str(produto_id)

    if chave not in carrinho:
        return {
            "erro": "Este produto não está no carrinho."
        }, 404

    if produto["estoque"] <= 0:
        return {
            "erro": "Este produto está sem estoque."
        }, 409

    if quantidade > produto["estoque"]:
        return {
            "erro": "Quantidade solicitada maior que o estoque disponível.",
            "estoque_disponivel": produto["estoque"]
        }, 409

    carrinho[chave] = quantidade

    return {
        "mensagem": "Quantidade atualizada com sucesso!",
        "produto": produto["nome"],
        "quantidade": quantidade
    }, 200

def remover_do_carrinho(carrinho, produto_id):
    chave = str(produto_id)

    if chave not in carrinho:
        return {
            "erro": "Este produto não está no carrinho."
        }, 404

    del carrinho[chave]

    return {
        "mensagem": "Produto removido do carrinho com sucesso!"
    }, 200