import { db, procurarId, salvarUsuarioBanco, filtrarProdutos, filtrarUsuarios, salvarProduto } from "./db.js";
import { validarCPF } from "./utils.js";


const logado = localStorage.getItem('isLogged') === 'true';
if (logado) 
{
    const idAtual = localStorage.getItem('usuarioID');
    const usuario = await procurarId(idAtual);
    if (usuario.tipo != 'administrador') 
    {
        alert("Voltando para a index !");
        window.location.href = 'index.html';
    }

}
else
{
    alert("Voltando para a index !");
    window.location.href = 'index.html';
}  

async function listarProdutos()
{
  const listar = document.getElementById('adm');
  
  const produtos = await filtrarProdutos();
  listar.innerHTML = 
  `
  <div class="container-lista">
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody id = "itens">
      </tbody>
    </table>
  </div>
`;

const itens = document.getElementById('itens');
for (const produto of produtos) 
{
    

itens.innerHTML +=
`
     <tr>
        <td>${produto.titulo}</td>
        <td>${produto.categoria}</td>
        <td>${produto.preco}</td>
        <td>${produto.estoque}</td>
        <td><img src="imagens/lixeira.png" onclick="excluirProdutoBanco('${produto._id}')"></td>
    </tr>
`
}

  
}

async function excluirProdutoBanco(id) 
{
    try{
    const confirmar = confirm("Tem certeza que deseja excluir este produto?");
    if (confirmar) 
    {
        const produto =  await procurarId(id);
        await db.remove(produto);
        alert("Produto excluido com sucesso");
        listarProdutos(); 
    }
    
    }
    catch
    {
        alert("Erro ao excluir produto");
        return;
    }
}


async function listarUsuarios() 
{
 const listar = document.getElementById('adm');
  
  const usuarios = await filtrarUsuarios();
  listar.innerHTML = 
  `
  <div class="container-lista">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cpf</th>
          <th>Telefone</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody id = "itens">
      </tbody>
    </table>
  </div>
`;

const itens = document.getElementById('itens');
for (const usuario of usuarios) 
{
    

itens.innerHTML +=
`
     <tr>
        <td>${usuario.nome}</td>
        <td>${usuario.cpf}</td>
        <td>${usuario.telefone}</td>
        <td><img src="imagens/lixeira.png" onclick="excluirUsuario('${usuario._id}')"></td>
    </tr>
`
}
}

async function excluirUsuario(id) 
{
    try 
    {
        const confirmar = confirm("Tem certeza que deseja excluir este usuario?");
        if (confirmar) 
        {
            const usuario = await procurarId(id);
            await db.remove(usuario);
            alert("Usuario excluido com sucesso");
            listarUsuarios();
        }
        
            
    } 
    catch
    {
        alert("Erro ao excluir");    
    }    
}
async function adicionarAdministrador() 
{
    const adicionar = document.getElementById('adm');
    
    adicionar.innerHTML =
    `
     <div class="container-cadastro">
    <div class="cadastro">
    <br>
    <label for="nome">Nome:</label>
    <br>
    <input type="text" id="nome" placeholder="Nome Completo">
    <br>

    <label for="usuario">Usuario:</label>
    <br>
    <input type="text" id="usuarioE" maxlength="14" placeholder="Minimo 6 digitos, Maximo 14">
    <br>

    <label for="senha">Senha:</label>
    <br>
    <input type="password" id="senha" maxlength="14" placeholder="Minimo 6 digitos, Maximo 14">
    <br>

    <label for="senha2">Repita a Senha:</label>
    <br>
    <input type="password" id="senha2" placeholder="Digite novamente">
    <br>

    <label for="cpf">CPF:</label>
    <br>
    <input type="text" id="cpf" maxlength="14" inputmode="numeric" placeholder="000.000.000-00">
    <br>

    <button class="botao-cadastro-adm" onclick="cadastroAdm()">Cadastrar</button>
  </div>
</div>
          
         
    `
}
async function cadastroAdm() 
{
    try
    {
     const nome =  document.getElementById('nome').value;
     const usuario =  document.getElementById('usuarioE').value;
     const senha =  document.getElementById('senha').value;
     const senha2 =  document.getElementById('senha2').value;
     let cpf =  document.getElementById('cpf').value;
     cpf = cpf.replace(/[^\d]+/g, '');

     console.log(usuario);
     console.log(senha);

       if (nome === '' || usuario === '' || senha === '' || senha2 === '' || cpf === '') {
            alert("Por favor, preencha todos os campos!");
            return;
        }

         else if (usuario.length < 6 || senha.length < 6) {
            alert("Usuario e senha devem conter mais de 6 digitos!");
            return;
        }
        else if (senha != senha2) {
            alert("As senha nao condizem!");
            return;
        }
        else if (await validarCPF(cpf) === false) {
            alert("Cpf inválido!");
            return;
        }
    
        const cadastro = {
            tipo: 'administrador',
            nome: nome,
            usuario: usuario,
            senha: senha,
            cpf: cpf,
        };
        await salvarUsuarioBanco(cadastro);
    }
    catch
    {
        alert("Erro ao cadastrar o administrador");
    }
}



async function adicionarProduto()
{
    const adicionar =  document.getElementById('adm');

    adicionar.innerHTML = 
    `
    <div class="container-cadastro">
    <div class="cadastro">
    <br>
    <label for="titulo">Titulo:</label>
    <br>
    <input type="text" id="titulo" placeholder="Digite o titulo">
    <br>


    <label for="categoria">Categoria:</label>
    <br>
    <select id="categorias">
    <option value="ferramentas e construção">
        Ferramentas e Construção
    </option>

    <option value="eletrônicos">
        Eletrônicos
    </option>

    <option value="brinquedos">
        Brinquedos
    </option>

    <option value="esporte e fitness">
        Esporte e Fitness
    </option>

    <option value="jogos">
        Jogos
    </option>

    <option value="informatica">
        Informática
    </option>

    <option value="petshop">
        PetShop
    </option>

    <option value="eletrodomésticos">
        Eletrodomésticos
    </option>

    <option value="moda">
        Moda
    </option>
    </select>

    <br>
    <label for="descricao">Descrição:</label>
    <br>
    <textarea id="descricao" rows="6" cols="22" placeholder="Descrição do produto"></textarea>
    <br>
    <label for="imagem">Imegem:</label>
    <br>
    <input type="file" id="imagem" accept="image/*">
    <br>
    <label for="preco">Preço:</label>
    <br>
    <input type="number" id="preco" step="0.01" placeholder="R$ 0,00">
    <br>
    <label for="estoque">Estoque:</label>
    <br>
    <input type="number" id="estoque" placeholder="quantidade">


 

    <button class="botao-cadastro-adm" onclick="cadastrarProduto()">Cadastrar</button>
    </div>
</div>
    `
}

async function cadastrarProduto() 
{
    const titulo = document.getElementById('titulo').value;
    const categoria = document.getElementById('categorias').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').files[0];
    const estoque = document.getElementById('estoque').value;
    const produto = {
        titulo: titulo,
        categoria:categoria,
        descricao:descricao,
        preco:preco,
        imagem:imagem,
        estoque:estoque,
    }

    if (!produto.titulo || !produto.imagem || !produto.descricao || !produto.preco || !produto.estoque)
    {
        alert("Por favor preencha todos os campos");
        return;
    }
    else
    {
    await salvarProduto(produto); 
    }
  


}


window.listarProdutos = listarProdutos;
window.excluirProdutoBanco = excluirProdutoBanco;
window.listarUsuarios = listarUsuarios;
window.excluirUsuario = excluirUsuario;
window.adicionarAdministrador = adicionarAdministrador;
window.cadastroAdm = cadastroAdm;
window.adicionarProduto = adicionarProduto;
window.cadastrarProduto = cadastrarProduto;