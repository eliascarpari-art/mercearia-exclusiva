import { db, procurarId, salvarProdutoCarrinho } from "./db.js";

async function adicionarCarrinho(idProduto) {
    try
    {
    
    const logado = localStorage.getItem('isLogged') === 'true';

    if (!logado) {
        {
        const pendentes = JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
        
        for (let i = 0; i < pendentes.length ; i++) 
        {
            if (pendentes[i].id === idProduto) 
            {
                alert("Produto já adicionado no carrinho");
                return;
            }
        }
           
        pendentes.push({    
        
        id: idProduto,
        quantidade: 1,
        check : true
        });
              
        
        localStorage.setItem('produtosPendentes', JSON.stringify(pendentes));
        alert("Produto adicionado com sucesso");
        return;
        }
        
    }
    else {

        const idAtual = localStorage.getItem('usuarioID');
        const usuario = await procurarId(idAtual);
        await salvarProdutoCarrinho(idProduto, usuario);
        
       
        
    }
    }
    catch
    {
        alert("Erro ao adicionar ao carrinho");
    }
}
async function excluirProduto(produtoid)
{
   

    try
    {
        const resposta = confirm("Tem certeza que deseja excluir este item do carrinho");
        if (resposta === false) 
        {
           return; 
        }
        const logado = localStorage.getItem('isLogged') === 'true';
        const produto = produtoid;
        let produtos= [];
        

        if (!logado) 
        {
            
            produtos = await JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
            for (let i = 0; i < produtos.length; i++)
        {
            if (produto === produtos[i].id)
            {
                
                produtos.splice(i,1);
                break;
                
            }
            
        }

        localStorage.setItem('produtosPendentes', JSON.stringify(produtos));
        
        window.location.href = "carrinho.html";

        }
        else
        {
            const idAtual = localStorage.getItem('usuarioID');
            const usuario = await procurarId(idAtual);
            for (let i = 0; i < usuario.carrinho.length; i++)
            {
        
            if (produto === usuario.carrinho[i].id)
            {
                console.log("achei");
                usuario.carrinho.splice(i,1);
                break;
                
            }
           
            
            }
            await db.put(usuario);
            window.location.href = "carrinho.html";


        }

        


    } catch 
    {
        alert("Erro ao excluir produto!");
    }
    
}

async function diminuir(i,produto) 
{
    try
    {
    let produtos= [];
    const logado = localStorage.getItem('isLogged') === 'true';
    
    const produtoId = produto;
    const menos = document.getElementById(`qtd-${i}`);

    if (menos.value > 1) 
    {
    
    
    menos.value -- ;
        
    }
    else
    {
        excluirProduto(produtoId);
        
    }

    if (!logado)
    {
        produtos = await JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
            for (let i = 0; i < produtos.length; i++)
            {
                if (produtoId === produtos[i].id)
                {
                    console.log("entrei no array do Não logado diminuir");
                    produtos[i].quantidade = menos.value;
                    console.log(produtos[i].quantidade);
                }   
                
            }
            localStorage.setItem('produtosPendentes', JSON.stringify(produtos));
            window.location.href = "carrinho.html";
    }
     else
    {
        const idAtual = localStorage.getItem('usuarioID');
        const usuario = await procurarId(idAtual);
        for (const item of usuario.carrinho) 
        {
            produtos.push(item);    
        }
        for (let i = 0; i < produtos.length; i++)
            {
                if (produtoId === produtos[i].id)
                {
                    produtos[i].quantidade = menos.value;
                }   
                
            }
            
            await db.put(usuario);
            window.location.href = "carrinho.html";

    }
}
catch
{
    console.log("Erro ao diminuir");
}
    
}
async function aumentar(i,produto) 
{
    try
    {
    const produtoId = produto;
    const produtoC = await procurarId(produtoId);
    const mais =  document.getElementById(`qtd-${i}`);
    if (mais.value < produtoC.estoque) 
    {
    mais.value ++;
    let produtos= [];
    const logado = localStorage.getItem('isLogged') === 'true';
    
    if (!logado )
    {
            produtos = await JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
            for (let i = 0; i < produtos.length; i++)
            {
                if (produtoId === produtos[i].id)
                {
                    produtos[i].quantidade = mais.value;
                }   
                
            }
            localStorage.setItem('produtosPendentes', JSON.stringify(produtos));
            window.location.href = "carrinho.html";
            
    }
    else
    {
        const idAtual = localStorage.getItem('usuarioID');
        const usuario = await procurarId(idAtual);
        for (const item of usuario.carrinho) 
        {
            produtos.push(item);    
        }
        for (let i = 0; i < produtos.length; i++)
            {
                if (produtoId === produtos[i].id)
                {
                    produtos[i].quantidade = mais.value;
                }   
                
            }
            await db.put(usuario);
            window.location.href = "carrinho.html";

    }
    }
    else
    {
        alert("Estoque máximo disponível adicionado");
        return;
    }
    
    }
    catch
    {
        console.log("Erro ao aumentar");
    }
}

export async function carrinho() {

    const produtoCarrinho = document.getElementById('produtoCarrinho');
    const valorCarrinho = document.getElementById('valorCarrinho');
    const logado = localStorage.getItem('isLogged') === 'true';
    let produtosId = [];
    let produtos = [];
    let precoTotal = 0 ;

    try {
        if (!logado) {
            produtosId = await JSON.parse(localStorage.getItem('produtosPendentes') || '[]');

            for (const idE of produtosId) {
            console.log(idE);
            console.log(idE.id);
            const quantidade = idE.quantidade; 
            console.log(quantidade);
            const produto = await procurarId(idE.id);
            console.log(produto._id)
            if (produto != false) {
                produtos.push({produto:produto,quantidade:quantidade,check:idE.check});
                console.log("Fiz o push");

            }
        }


        }
        else {
            const idAtual = localStorage.getItem('usuarioID');
            const usuario = await procurarId(idAtual);

            for (const produto of usuario.carrinho) 
            {   const produtoE = await procurarId(produto.id);
                if (produtoE != false)
                {
                produtos.push({produto:produtoE,quantidade:produto.quantidade,check:produto.check});
                }
            }
        }
       
        
    let produtosCheck = [];

    if (produtos.length > 0) {
    for (let i = 0;i < produtos.length;i++) {
    
    if (produtos[i].check !=  false) 
    {
        precoTotal += produtos[i].produto.preco * produtos[i].quantidade;
        produtosCheck.push(produtos[i]);
    }
     produtoCarrinho.innerHTML +=
     `
     <img onclick = "acessarProduto('${produtos[i].produto._id}')" src="${produtos[i].produto.imagem}"  onerror="this.src='imagens/noimagem.png'">
     <button class="lixeira" onclick="excluirProduto('${produtos[i].produto._id}')"><img src= "imagens/lixeira.png"></button>
     <input type="checkbox" id="meuCheck-${i}" onchange="verificarCheck(this, ${i},'${produtos[i].produto._id}')" ${produtos[i].check ? 'checked' : ''}>
     <h3 class="nome-produto=carrinho">${produtos[i].produto.titulo}</h3>
     <p  class="preco-produto-carrinho">Valor:${produtos[i].produto.preco.toFixed(2)}R$</p>
     <div class="quantidade">
     <button onclick="diminuir(${i},'${produtos[i].produto._id}')">-</button>
     <input class="input-quantidade" type="number" id="qtd-${i}" value="${produtos[i].quantidade}" min="1" max="99" readonly>
     <button onclick="aumentar(${i},'${produtos[i].produto._id}')">+</button>
     <br>
     <br>
     </div>

    `;
    
      
    }
      
   

    valorCarrinho.innerHTML +=
    `
   <p>Valor Total : ${precoTotal.toFixed(2)}R$</p>
    <button id="btnComprar" class="comprar">Comprar Agora</button>
    `

    document.getElementById('btnComprar').addEventListener('click', () => {
    comprar(produtosCheck);
    });
    }
    else {

    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';
    carrinho.innerHTML +=
    `
    <div id="carrinho" class="carrinho-container">
     
     
     <div class="container-vazio">
        <p class ="sem-produtos">Carrinho vazio, adicione produtos.<p>
        <img src = "imagens/carrinho-vazio.png">
        <button onclick="window.location.href='index.html'" class="botao-carrinho-vazio">Ver produtos</button>
     </div>
    </div> 
    `
    }
    }
    catch {
        alert("Erro no sistema carrinho");
    }
}

async function verificarCheck(check, i,idProduto) 
{
    try
    {
    const logado = localStorage.getItem('isLogged') === 'true';
    if (check.checked)
    {
    if (logado) 
    {
        const idAtual = localStorage.getItem('usuarioID');
        const usuario = await procurarId(idAtual);

        for (const item of usuario.carrinho) 
        {
            if (item.id === idProduto) 
            {
                item.check = true;
                db.put(usuario);
                window.location.href = "carrinho.html";    
            }    
        }
        
    }
    else
    {
       const pendentes = JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
        
      for (const item of pendentes) 
      {
        if (item.id === idProduto) 
        {
            item.check = true;
            localStorage.setItem('produtosPendentes', JSON.stringify(pendentes));
            window.location.href = "carrinho.html";        
        }  
      }
        
    }
    }
    else
    {
    if (!check.checked && logado) 
    {
        const idAtual = localStorage.getItem('usuarioID');
        const usuario = await procurarId(idAtual);

        for (const item of usuario.carrinho) 
        {
            console.log(item);
            if (item.id === idProduto) 
            {
                item.check = false;
                db.put(usuario);
                window.location.href = "carrinho.html";    
            }    
        }
        
    }
    else
    {
        const pendentes = JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
        
      for (const item of pendentes) 
      {
        if (item.id === idProduto) 
        {
            item.check = false;
            localStorage.setItem('produtosPendentes', JSON.stringify(pendentes));
            window.location.href = "carrinho.html";        
        }  
      }

    }

    }
}
catch
{
    console.log("Erro na checagem de carrinho!");
}
}

window.adicionarCarrinho = adicionarCarrinho;
window.excluirProduto = excluirProduto;
window.diminuir = diminuir;
window.aumentar = aumentar;
window.verificarCheck = verificarCheck;
//window.comprar = comprar;
