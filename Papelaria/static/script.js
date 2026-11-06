// ======================================================
// ELEMENTOS DO HTML
// ======================================================

console.log("SCRIPT.JS CARREGOU!");

const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisar = document.getElementById("botaoPesquisar");

const botaoMinhaConta = document.getElementById("botaoMinhaConta");
const contaModal = document.getElementById("contaModal");
const fecharConta = document.getElementById("fecharConta");
const nomeCliente = document.getElementById("nomeCliente");
const emailCliente = document.getElementById("emailCliente");
const listaMeusPedidos = document.getElementById("listaMeusPedidos");
const botaoSairConta = document.getElementById("botaoSairConta");

const botaoCarrinho = document.getElementById("botaoCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const carrinhoModal = document.getElementById("carrinhoModal");
const listaCarrinho = document.getElementById("listaCarrinho");
const valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const botaoFinalizarCompra = document.getElementById("finalizarCompra");

const autenticacaoModal = document.getElementById("autenticacaoModal");
const fecharAutenticacao = document.getElementById("fecharAutenticacao");
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const tituloAutenticacao = document.getElementById("tituloAutenticacao");
const mensagemAutenticacao = document.getElementById("mensagemAutenticacao");
const mostrarCadastro = document.getElementById("mostrarCadastro");
const mostrarLogin = document.getElementById("mostrarLogin");

let checkoutPendente = false;


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => {
        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entidades[caractere];
    });
}

function escolherFundo(categoria) {
    const categoriaNormalizada = String(categoria || "").toLowerCase();

    if (categoriaNormalizada.includes("caderno")) {
        return "fundo-produto-verde";
    }

    if (categoriaNormalizada.includes("caneta")) {
        return "fundo-produto-rosa";
    }

    if (categoriaNormalizada.includes("papel")) {
        return "fundo-produto-amarelo";
    }

    return "fundo-produto-creme";
}


// ======================================================
// IMAGENS DOS PRODUTOS
// ======================================================

const imagensProdutos = {
    "Caneta esferográfica azul": "caneta-azul.jpg",
    "Caneta esferográfica preta": "caneta-preta.jpg",
    "Caderno": "caderno.jpg",
    "Lápis": "lapis.jpg",
    "Lapiseira": "lapiseira.jpg",
    "Borracha": "borracha.jpg",
    "Apontador": "apontador.jpg",
    "Régua": "regua.jpg",
    "Marca texto": "marca-texto.jpg",
    "Papel sulfite": "papel-sulfite.jpg",
    "Caneta vermelha": "caneta-vermelha.jpg",
    "Caneta esferográfica vermelha": "caneta-vermelha.jpg",
    "Caneta gel": "caneta-gel.jpg",
    "Lápis de cor": "lapis-de-cor.jpg",
    "Giz de cera": "giz-de-cera.jpg",
    "Estojo": "estojo.jpg",
    "Mochila": "mochila.jpg",
    "Tesoura": "tesoura.jpg",
    "Cola branca": "cola-branca.jpg",
    "Cola bastão": "cola-bastao.jpg",
    "Fita adesiva": "fita-adesiva.jpg",
    "Grampeador": "grampeador.jpg",
    "Grampo": "grampo.jpg",
    "Clips": "clips.jpg",
    "Pasta catálogo": "pasta-catalogo.jpg",
    "Pasta escolar": "pasta-escolar.jpg",
    "Envelope": "envelope.jpg",
    "Cartolina": "cartolina.jpg",
    "Papel cartão": "papel-cartao.jpg",
    "Papel colorido": "papel-colorido.jpg",
    "Post-it": "post-it.jpg",
    "Corretivo": "corretivo.jpg"
};

// Padroniza os nomes para facilitar a comparação.
function normalizarNome(nome) {
    return String(nome || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// Extensões testadas, em ordem, caso o arquivo não seja .jpg
const EXTENSOES_IMAGEM = ["jpg", "jpeg", "png", "webp"];

// Imagem cinza simples, embutida no código (nunca dá erro 404).
const IMAGEM_PADRAO =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
        '<rect width="100%" height="100%" fill="#EAE6D9"/>' +
        '<text x="50%" y="50%" font-family="Arial" font-size="24" ' +
        'fill="#777D78" text-anchor="middle" dominant-baseline="middle">' +
        'Sem imagem</text></svg>'
    );

// Encontra o nome-base (sem extensão) da imagem do produto.
function buscarNomeBaseImagem(nomeProduto) {
    const alvo = normalizarNome(nomeProduto);
    const chaves = Object.keys(imagensProdutos);

    // 1) nome exato
    let chave = chaves.find(nome => normalizarNome(nome) === alvo);

    // 2) nome parecido (ex.: "Caderno espiral" encontra "Caderno")
    if (!chave) {
        chave = chaves
            .filter(nome => {
                // compara palavras inteiras: "lapis" NÃO casa com "lapiseira"
                const n = normalizarNome(nome);
                return (" " + alvo + " ").includes(" " + n + " ") ||
                       (" " + n + " ").includes(" " + alvo + " ");
            })
            .sort((a, b) => b.length - a.length)[0];
    }

    if (!chave) {
        console.warn("Imagem não cadastrada para:", nomeProduto);
        return null;
    }

    // tira a extensão, porque ela é descoberta na hora
    return imagensProdutos[chave].replace(/\.[^.]+$/, "");
}

// Chamada pelo onerror da <img>: tenta a próxima extensão.
function tentarProximaImagem(img) {
    const base = img.dataset.base;
    const proxima = Number(img.dataset.tentativa || 0) + 1;

    if (!base || proxima >= EXTENSOES_IMAGEM.length) {
        console.warn("Nenhuma imagem encontrada para:", base);
        img.onerror = null;
        img.src = IMAGEM_PADRAO;
        return;
    }

    img.dataset.tentativa = proxima;
    img.src = `/static/imagens/${base}.${EXTENSOES_IMAGEM[proxima]}`;
}


// ======================================================
// CATÁLOGO DE PRODUTOS
// ======================================================

async function carregarProdutos(busca = "") {
    listaProdutos.innerHTML = "<p>Carregando produtos...</p>";

    try {
        const parametros = new URLSearchParams();

        if (busca.trim()) {
            parametros.set("busca", busca.trim());
        }

        const resposta = await fetch(
            `/api/produtos?${parametros.toString()}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar os produtos.");
        }

        const dados = await resposta.json();

        mostrarProdutos(dados.produtos);

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        listaProdutos.innerHTML =
            "<p>Não foi possível carregar os produtos. Tente novamente.</p>";
    }
}

function mostrarProdutos(produtos) {
    if (!produtos || produtos.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    listaProdutos.innerHTML = produtos.map(produto => {

        const nome = escaparHTML(produto.nome);
        const categoria = escaparHTML(produto.categoria);
        const descricao = escaparHTML(produto.descricao);
        const fundo = escolherFundo(produto.categoria);

        const estoque = Number(produto.estoque);
        const semEstoque = estoque <= 0;

        // Busca a imagem do produto (aceita jpg, jpeg, png e webp).
        const nomeBase = buscarNomeBaseImagem(produto.nome);

        const caminhoImagem = nomeBase
            ? `/static/imagens/${nomeBase}.${EXTENSOES_IMAGEM[0]}`
            : IMAGEM_PADRAO;

        return `
            <article class="produto">

                <div class="produto-imagem ${fundo}">

                    <img
                        src="${caminhoImagem}"
                        alt="${nome}"
                        data-base="${nomeBase || ""}"
                        data-tentativa="0"
                        onerror="tentarProximaImagem(this)"
                    >

                </div>

                <div class="produto-info">

                    <p class="produto-categoria">${categoria}</p>

                    <h3>${nome}</h3>

                    <p>${descricao}</p>

                    <p class="preco">
                        ${formatarPreco(produto.preco)}
                    </p>

                    <p class="produto-categoria">
                        ${semEstoque
                            ? "Produto indisponível"
                            : `Estoque: ${estoque} unidade(s)`
                        }
                    </p>

                    <button
                        class="adicionar"
                        type="button"
                        data-produto-id="${produto.id}"
                        ${semEstoque ? "disabled" : ""}
                    >
                        ${semEstoque
                            ? "Sem estoque"
                            : "Adicionar ao carrinho"
                        }
                    </button>

                </div>

            </article>
        `;
    }).join("");
}

botaoPesquisar.addEventListener("click", () => {
    carregarProdutos(campoPesquisa.value);
});

campoPesquisa.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
        carregarProdutos(campoPesquisa.value);
    }
});


// ======================================================
// CARRINHO DE COMPRAS
// ======================================================

listaProdutos.addEventListener("click", async evento => {
    const botao = evento.target.closest("[data-produto-id]");

    if (!botao) return;

    const produtoId = Number(botao.dataset.produtoId);

    try {
        const resposta = await fetch("/api/carrinho", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                produto_id: produtoId,
                quantidade: 1
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Não foi possível adicionar o produto.");
            return;
        }

        alert("Produto adicionado ao carrinho!");

        await consultarCarrinhoVisual();

    } catch (erro) {
        console.error("Erro ao adicionar produto:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});

function atualizarContador(dados) {
    contadorCarrinho.textContent = dados.total_itens || 0;
}

async function carregarCarrinho() {
    try {
        const resposta = await fetch("/api/carrinho");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar carrinho.");
        }

        const dados = await resposta.json();

        atualizarContador(dados);

    } catch (erro) {
        console.error("Erro ao carregar carrinho:", erro);
    }
}

function mostrarCarrinho(dados) {
    const itens = dados.itens || [];

    atualizarContador(dados);

    valorTotalCarrinho.textContent =
        formatarPreco(dados.valor_total || 0);

    if (itens.length === 0) {
        listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    listaCarrinho.innerHTML = itens.map(item => `
        <div class="item-carrinho">
            <div class="item-carrinho-info">
                <h3>${escaparHTML(item.nome)}</h3>

                <p>Preço unitário:
                    ${formatarPreco(item.preco_unitario)}
                </p>

                <p>Subtotal:
                    ${formatarPreco(item.subtotal)}
                </p>

                <div class="item-carrinho-acoes">
                    <button type="button" data-acao="diminuir"
                        data-produto-id="${item.produto_id}">−</button>

                    <span>${item.quantidade}</span>

                    <button type="button" data-acao="aumentar"
                        data-produto-id="${item.produto_id}">+</button>

                    <button type="button" class="remover-item"
                        data-acao="remover"
                        data-produto-id="${item.produto_id}">Remover</button>
                </div>
            </div>
        </div>
    `).join("");
}

async function consultarCarrinhoVisual() {
    try {
        const resposta = await fetch("/api/carrinho");

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o carrinho.");
        }

        const dados = await resposta.json();

        mostrarCarrinho(dados);

    } catch (erro) {
        console.error("Erro ao carregar carrinho:", erro);
        listaCarrinho.innerHTML = "<p>Erro ao carregar o carrinho.</p>";
    }
}

botaoCarrinho.addEventListener("click", async evento => {
    evento.preventDefault();
    carrinhoModal.classList.add("aberto");
    await consultarCarrinhoVisual();
});

fecharCarrinho.addEventListener("click", () => {
    carrinhoModal.classList.remove("aberto");
});

carrinhoModal.addEventListener("click", evento => {
    if (evento.target === carrinhoModal) {
        carrinhoModal.classList.remove("aberto");
    }
});

listaCarrinho.addEventListener("click", async evento => {
    const botao = evento.target.closest("[data-acao]");

    if (!botao) return;

    const produtoId = Number(botao.dataset.produtoId);
    const acao = botao.dataset.acao;

    try {
        let resposta;

        if (acao === "remover") {
            resposta = await fetch(`/api/carrinho/${produtoId}`, {
                method: "DELETE"
            });

        } else {
            const quantidadeAtual = Number(
                botao.parentElement.querySelector("span").textContent
            );

            const novaQuantidade = acao === "aumentar"
                ? quantidadeAtual + 1
                : quantidadeAtual - 1;

            if (novaQuantidade < 1) return;

            resposta = await fetch(`/api/carrinho/${produtoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantidade: novaQuantidade
                })
            });
        }

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Não foi possível atualizar o carrinho.");
            return;
        }

        await consultarCarrinhoVisual();

    } catch (erro) {
        console.error("Erro ao atualizar carrinho:", erro);
        alert("Erro ao atualizar o carrinho.");
    }
});


// ======================================================
// LOGIN E CADASTRO
// ======================================================

function abrirAutenticacao() {
    autenticacaoModal.classList.add("aberto");
    mostrarFormularioLogin();
}

function mostrarFormularioLogin() {
    formLogin.style.display = "flex";
    formCadastro.style.display = "none";
    tituloAutenticacao.textContent = "Entre na sua conta";
    mensagemAutenticacao.textContent = "";
}

function mostrarFormularioCadastro() {
    formLogin.style.display = "none";
    formCadastro.style.display = "flex";
    tituloAutenticacao.textContent = "Crie sua conta";
    mensagemAutenticacao.textContent = "";
}

mostrarCadastro.addEventListener("click", evento => {
    evento.preventDefault();
    mostrarFormularioCadastro();
});

mostrarLogin.addEventListener("click", evento => {
    evento.preventDefault();
    mostrarFormularioLogin();
});

fecharAutenticacao.addEventListener("click", () => {
    autenticacaoModal.classList.remove("aberto");
});

autenticacaoModal.addEventListener("click", evento => {
    if (evento.target === autenticacaoModal) {
        autenticacaoModal.classList.remove("aberto");
    }
});


// ======================================================
// MINHA CONTA E HISTÓRICO DE PEDIDOS
// ======================================================

async function carregarHistoricoPedidos() {
    listaMeusPedidos.innerHTML = "<p>Carregando seus pedidos...</p>";

    try {
        const resposta = await fetch("/api/me/pedidos");
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Não foi possível consultar os pedidos."
            );
        }

        const pedidos = dados.pedidos || [];

        if (pedidos.length === 0) {
            listaMeusPedidos.innerHTML =
                "<p>Você ainda não realizou nenhum pedido.</p>";
            return;
        }

        listaMeusPedidos.innerHTML = pedidos.map(pedido => {
            const itens = (pedido.itens || []).map(item => `
                <div class="pedido-item">
                    <p><strong>${escaparHTML(item.nome)}</strong></p>
                    <p>Quantidade: ${Number(item.quantidade)}</p>
                    <p>Preço unitário: ${formatarPreco(item.preco_unitario)}</p>
                    <p>Subtotal: ${formatarPreco(item.subtotal)}</p>
                </div>
            `).join("");

            return `
                <div class="pedido-card">
                    <h4>Pedido #${escaparHTML(pedido.id)}</h4>
                    <p>Status: ${escaparHTML(pedido.status)}</p>
                    ${itens}
                    <p class="pedido-total">
                        <strong>Total: ${formatarPreco(pedido.valor_total)}</strong>
                    </p>
                </div>
            `;
        }).join("");

    } catch (erro) {
        console.error("Erro ao carregar histórico:", erro);
        listaMeusPedidos.innerHTML =
            "<p>Não foi possível carregar seu histórico de pedidos.</p>";
    }
}

async function abrirMinhaConta() {
    checkoutPendente = false;

    try {
        const resposta = await fetch("/api/me");
        const dados = await resposta.json();

        if (!resposta.ok || !dados.usuario) {
            abrirAutenticacao();
            return;
        }

        nomeCliente.textContent = dados.usuario.nome;
        emailCliente.textContent = dados.usuario.email;

        autenticacaoModal.classList.remove("aberto");
        contaModal.classList.add("aberto");

        await carregarHistoricoPedidos();

    } catch (erro) {
        console.error("Erro ao consultar conta:", erro);
        alert("Não foi possível consultar sua conta.");
    }
}

async function atualizarEstadoConta() {
    try {
        const resposta = await fetch("/api/me");
        const dados = await resposta.json();

        botaoMinhaConta.textContent =
            resposta.ok && dados.usuario
                ? dados.usuario.nome
                : "Minha conta";

    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
        botaoMinhaConta.textContent = "Minha conta";
    }
}

botaoMinhaConta.addEventListener("click", evento => {
    evento.preventDefault();
    abrirMinhaConta();
});

fecharConta.addEventListener("click", () => {
    contaModal.classList.remove("aberto");
});

contaModal.addEventListener("click", evento => {
    if (evento.target === contaModal) {
        contaModal.classList.remove("aberto");
    }
});

botaoSairConta.addEventListener("click", async () => {
    try {
        const resposta = await fetch("/api/logout", {
            method: "POST"
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Não foi possível sair da conta.");
            return;
        }

        contaModal.classList.remove("aberto");
        await atualizarEstadoConta();
        alert("Você saiu da sua conta.");

    } catch (erro) {
        console.error("Erro ao sair da conta:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});


// ======================================================
// AUTENTICAÇÃO: LOGIN
// ======================================================

formLogin.addEventListener("submit", async evento => {
    evento.preventDefault();

    const dadosLogin = {
        email: document.getElementById("loginEmail").value,
        senha: document.getElementById("loginSenha").value
    };

    try {
        mensagemAutenticacao.textContent = "Entrando...";

        const resposta = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemAutenticacao.textContent =
                dados.erro || "Não foi possível entrar.";
            return;
        }

        autenticacaoModal.classList.remove("aberto");
        formLogin.reset();

        await atualizarEstadoConta();

        const deveFinalizarCompra = checkoutPendente;
        checkoutPendente = false;

        if (deveFinalizarCompra) {
            await realizarCheckout();
        } else {
            await abrirMinhaConta();
        }

    } catch (erro) {
        console.error("Erro no login:", erro);
        mensagemAutenticacao.textContent =
            "Erro de conexão com o servidor.";
    }
});


// ======================================================
// AUTENTICAÇÃO: CADASTRO
// ======================================================

formCadastro.addEventListener("submit", async evento => {
    evento.preventDefault();

    const dadosCadastro = {
        nome: document.getElementById("cadastroNome").value,
        email: document.getElementById("cadastroEmail").value,
        senha: document.getElementById("cadastroSenha").value
    };

    try {
        mensagemAutenticacao.textContent = "Criando sua conta...";

        const resposta = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCadastro)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemAutenticacao.textContent =
                dados.erro || "Não foi possível realizar o cadastro.";
            return;
        }

        const respostaLogin = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: dadosCadastro.email,
                senha: dadosCadastro.senha
            })
        });

        const dadosLogin = await respostaLogin.json();

        if (!respostaLogin.ok) {
            mensagemAutenticacao.textContent =
                dadosLogin.erro || "Cadastro realizado. Faça login para continuar.";

            mostrarFormularioLogin();

            document.getElementById("loginEmail").value =
                dadosCadastro.email;

            return;
        }

        autenticacaoModal.classList.remove("aberto");
        formCadastro.reset();

        await atualizarEstadoConta();

        const deveFinalizarCompra = checkoutPendente;
        checkoutPendente = false;

        if (deveFinalizarCompra) {
            await realizarCheckout();
        } else {
            await abrirMinhaConta();
        }

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        mensagemAutenticacao.textContent =
            "Erro de conexão com o servidor.";
    }
});


// ======================================================
// FINALIZAÇÃO DA COMPRA
// ======================================================

async function realizarCheckout() {
    try {
        const resposta = await fetch("/api/pedidos", {
            method: "POST"
        });

        const dados = await resposta.json();

        if (resposta.status === 401) {
            checkoutPendente = true;
            abrirAutenticacao();

            mensagemAutenticacao.textContent =
                "Entre na sua conta para finalizar sua compra.";

            return;
        }

        if (!resposta.ok) {
            alert(dados.erro || "Não foi possível finalizar a compra.");
            return;
        }

        checkoutPendente = false;
        carrinhoModal.classList.remove("aberto");

        await consultarCarrinhoVisual();
        await atualizarEstadoConta();

        alert("Compra realizada com sucesso! Obrigado por comprar na Papelê.");

        console.log("Pedido realizado:", dados);

    } catch (erro) {
        console.error("Erro ao finalizar compra:", erro);
        alert("Erro de conexão ao finalizar a compra.");
    }
}

botaoFinalizarCompra.addEventListener("click", async () => {
    await realizarCheckout();
});


// ======================================================
// INICIALIZAÇÃO DA LOJA
// ======================================================

carregarProdutos();
carregarCarrinho();
atualizarEstadoConta();