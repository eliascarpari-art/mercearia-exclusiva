import { procurarId } from "./db.js";
export async function carregarDetalhesDoProduto() {
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = urlParams.get('id');

        if (!produtoId) return;


        const produto = await procurarId(produtoId);


        const verProduto = document.getElementById('produto');

        if (verProduto) {
            let parcelado = produto.preco / 12;


            verProduto.innerHTML = `
                <div class="descricao-container">
                    <div><h2>${produto.titulo}</h2></div>
                    <div class="avaliacao">Nota de Avaliações: ${produto.classificacao} ⭐</div>
                    <div class="estoque">Restam ainda ${produto.estoque} produtos</div>
                    <p class="titulo-descricao">Descrição do Produto</p>
                    <div class="descricao">${produto.descricao}</div>
                </div>
                <div class="imagem-container"> <img src="${produto.imagem}"  onerror="this.src='imagens/noimagem.png'"></div>
                <div class="container-valor">
                    <div class="preco">R$${produto.preco.toFixed(2)}</div>
                    <div class="parcelado">ou em 12x de ${parcelado.toFixed(2)}</div>
                    <button onclick = "adicionarCarrinho('${produto._id}')" class="add-carrinho">Adicionar Ao Carrinho🛒</button>
                </div>
            `;
        }
    } catch (error) {
        console.error("Erro ao carregar produto:", error);
    }
}