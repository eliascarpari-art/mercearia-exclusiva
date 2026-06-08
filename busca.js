import { filtrarProdutos } from "./db.js";
import { removerAcentos } from "./utils.js";

async function pesquisar(value)
{
    try{
    const busca = document.getElementById('campoBusca').value;
    const palavras = busca.split(' ');
    if (busca != '') 
    {
        window.location.href = `busca.html?busca=${palavras}`;
    }
    else
    {
        alert("Digite algo para pesquisar");
        return;
    }
    }

    catch
    {
        alert("Erro ao pesquisar");
    }

}

export async function carregarPesquisa() 
{
    try
    {
    
    const urlParams = new URLSearchParams(window.location.search);
    const busca = urlParams.get('busca');
    const palavras = busca.split(',');
    const produtos = await filtrarProdutos();

    let encontrados = [];

    for (const produto of produtos) 
    {
        const produtoU = await removerAcentos(produto.titulo);
        for (const palavra of palavras) 
        {
        const palavraU = await removerAcentos(palavra);
        console.log (palavra.length);   
        if (produtoU.toLowerCase().includes(palavraU.toLowerCase()) && palavraU.length > 3)
        {
            encontrados.push(produto);
            break;
           
        }
        }
    }

    if (encontrados.length == 0) 
    {
        for (const produto of produtos) 
    {
        const produtoU = await removerAcentos(produto.categoria);
        for (const palavra of palavras) 
        { 
        const palavraU = await removerAcentos(palavra);  
        if (produtoU.toLowerCase().includes(palavraU.toLowerCase()) && palavraU.length > 3)
        {
            encontrados.push(produto);
        }
        }
    }
    }

    if (encontrados.length > 0) 
    {
        const buscaContainer = document.getElementById('busca');
        buscaContainer.innerHTML = '';

        for (let i = 0; i < encontrados.length; i++) {
        buscaContainer.innerHTML +=
        `
        
        <div class="container-cards" onclick="acessarProduto('${encontrados[i]._id}')">
        <img src="${encontrados[i].imagem}"  onerror="this.src='imagens/noimagem.png'">
        <p>${encontrados[i].titulo}</p>
        <p>R$${encontrados[i].preco.toFixed(2)}</p>
        </div> 
        `;
        }     
    }
    else
    {
        alert("Nenhum produto encontrado");
    }
    }

    catch
    {
        alert("Erro ao  carregar a pesquisa tente novamente mais tarde!");
    }
    
}

window.pesquisar = pesquisar;
