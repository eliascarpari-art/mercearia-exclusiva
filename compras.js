import { db, procurarId } from "./db.js";

export async function carregarCompras() 
{
    try
    {
    const idAtual = localStorage.getItem('usuarioID');
    const usuario = await procurarId(idAtual);
    const produtoCompras = document.getElementById('produtoCompras');
    
     for (const item of usuario.compras) 
    {
    if (item.avaliado === 'false') 
    {
        produtoCompras.innerHTML +=
     `
     <img onclick = "acessarProduto('${item.produto._id}')" src="${item.produto.imagem}"  onerror="this.src='imagens/noimagem.png'">
     <h3 class="nome-produto-preco">${item.produto.titulo}</h3>
     <p  class="preco-produto-preco">Valor gasto:R$${item.produto.preco*item.quantidade}</p>
     <p  class="preco-produto-preco">Quantidade:${item.quantidade}</p>
     <div class="estrelas">
    <span class="estrela" onclick="avaliar(1,'${item.produto._id}','${usuario._id}','${item.id}')">☆</span>
    <span class="estrela" onclick="avaliar(2,'${item.produto._id}','${usuario._id}','${item.id}')">☆</span>
    <span class="estrela" onclick="avaliar(3,'${item.produto._id}','${usuario._id}','${item.id}')">☆</span>
    <span class="estrela" onclick="avaliar(4,'${item.produto._id}','${usuario._id}','${item.id}')">☆</span>
    <span class="estrela" onclick="avaliar(5,'${item.produto._id}','${usuario._id}','${item.id}')">☆</span>
    </div>
     <br>

    `;
    }
    else
    {
        produtoCompras.innerHTML +=
     `
     <img onclick = "acessarProduto('${item.produto._id}')" src="${item.produto.imagem}"  onerror="this.src='imagens/noimagem.png'">
     <h3 class="nome-produto-preco">${item.produto.titulo}</h3>
     <p  class="preco-produto-preco">Valor gasto:R$${item.produto.preco*item.quantidade}</p>
     <p  class="preco-produto-preco">Quantidade:${item.quantidade}</p>
     <p class = "produto-avaliado">Produto Avaliado com ${item.nota} ⭐</p>
     <br>

    `;
    }
     
    }
}
catch{
    alert("Erro na funcão carregar compras");
}
}

async function comprar(produtos) 
{
    try
    {
    if (produtos.length == 0 ) 
    {
        alert("Assinale os itens para compra");   
        return; 
    }
    const logado = localStorage.getItem('isLogged') === 'true';
    if (!logado) 
    {
        alert("Cadastre-se para comprar");
        window.location.href = `cadastro.html`;
        return;

    }
    else
    {
        let nomes = '';
        let valorTotal = 0;
        for (const  item of produtos) 
        {
            console.log(item.produto.preco);
            valorTotal += item.produto.preco * item.quantidade;
            nomes += item.produto.titulo + ",";

        }
       const comprar =  confirm(`Tem certeza que deseja comprar os itens:${nomes} no valor de ${valorTotal}`);


       if (comprar) 
       {
          const idAtual = localStorage.getItem('usuarioID');
          const usuario = await procurarId(idAtual);

          for (const item of produtos) 
          {
    
            usuario.compras.push({produto:item.produto,quantidade:item.quantidade,avaliado:'false',id:Date.now().toString(),nota:0});
            
           for (let i= 0; i < usuario.carrinho.length; i++)
           {
             if (usuario.carrinho[i].id === item.produto._id) 
             {
                usuario.carrinho.splice(i,1);
                
             }
            
           }     
          
            const produto = await procurarId(item.produto._id);
            produto.estoque -= item.quantidade;
            if (produto.estoque <= 0) 
            {
                await db.remove(produto);
            }
            else
            {
                await db.put(produto);
            }

          }
          await db.put(usuario); 
          alert("compra efetuada com sucesso!");
          window.location.href =`compras.html`;


       }
    }
}
catch
{
    alert("Erro na função comprar");
}
}


async function avaliar(nota,produto1,usuario1,itemID) {
    try
    {
    const usuario = await procurarId(usuario1);
    const produto = await procurarId(produto1);
    
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add('ativa'); 
        } else {
            estrela.classList.remove('ativa'); 
        }
     
    });
    const confirmacao = confirm(`Deseja avaliar o item com ${nota} estrelhas?`); 
    if (confirmacao) {
    for (const item of usuario.compras) {
      
            if (item.id === itemID) 
        {
           
             if (item.avaliado === 'false') 
            {
                item.avaliado = 'true';
                item.nota = nota;
                produto.quantidadeAvaliacao ++;
                produto.totalAvaliacao += nota;
                produto.classificacao =  produto.totalAvaliacao / produto.quantidadeAvaliacao ;
                await db.put(produto);   
                await db.put(usuario);
                alert("Produto avaliado com sucesso");
                window.location.href='compras.html';
            }   
        }
            
        }
            
    }
    else
    {
        return;
    }
}
catch
{
    alert("Erro na funcão avaliar");
}
    
}
window.comprar = comprar;
window.avaliar = avaliar;