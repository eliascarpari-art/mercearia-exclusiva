import { filtrarProdutos, procurarId } from "./db.js";

export async function vitrine() {

     try {
    const vitrineContainer = document.getElementById('vitrine');
    vitrineContainer.innerHTML = "";
    const produtos = await filtrarProdutos();


    const idsEscolhidos = [];
    for (let i = 0; idsEscolhidos.length <= 20; i++) {

        const indice = Math.floor(Math.random() * produtos.length) ;
        if (!idsEscolhidos.includes(indice)) {

            idsEscolhidos.push(indice);
        }

    }
   
        for (let i = 0; i <= 20; i++) {
            const produto = produtos[idsEscolhidos[i]];
            vitrineContainer.innerHTML +=
                `
        
        <div class="container-cards" onclick="acessarProduto('${produto._id}')">
        <img src="${produto.imagem}" onerror="this.src='imagens/noimagem.png'">
        <p>${produto.titulo}</p>
        <p>R$${produto.preco.toFixed(2)}</p>
        </div> 
        `;
        }
    }

    catch {
        console.log(`Erro na vitrine`);
    }

}

