import { procurarCategoria } from "./db.js";

async function clickCategoria(categoria) {
    window.location.href = `categoria.html?categoria=${categoria}`;
}


export async function Categoria() {
    console.log('dentro da função categoria');
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    const produtos = await procurarCategoria(categoria);

    const categoriaVitrine = document.getElementById('categoria');


    console.log('parando aqui');
    await produtos.forEach(produto => {
        try {
            categoriaVitrine.innerHTML +=
                `
        <div class="container-cards" onclick="acessarProduto('${produto._id}')">
        <img src="${produto.imagem}" onerror="this.src='imagens/noimagem.png'">
        <p>${produto.titulo}</p>
        <p>R$${Number(produto.preco).toFixed(2)}</p>
        </div> 
        `;
        }
        catch {
            console.log(`Erro no produto`);
        }




    });

}

window.clickCategoria = clickCategoria;