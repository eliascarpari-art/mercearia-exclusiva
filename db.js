import PouchDB from 'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/+esm';

export const db = new PouchDB("Mercearialivre");


export async function filtrarProdutos() 
{
  const info = await db.allDocs({ include_docs: true });
  const usuariosInfo = info.rows.map(row => row.doc);
  
  const produtos = [];
    for (const info  of usuariosInfo) 
    {
       
        if (info.tipo === "produto") 
        {
            
            produtos.push(info)   
        }
    }
  
  return produtos;
  
}

export async function filtrarUsuarios() 
{
  const info = await db.allDocs({ include_docs: true });
  const usuariosInfo = info.rows.map(row => row.doc);
  
  const usuario = [];
    for (const info  of usuariosInfo) 
    {
       
        if (info.tipo === "usuario") 
        {
            
            usuario.push(info)   
        }
    }
  
  return usuario;
  
}

export async function salvarUsuarioBanco(cadastro) 
{
  try
  {
        const info = await db.allDocs({ include_docs: true });
        const usuariosInfo = info.rows.map(row => row.doc);
        const usuarios = usuariosInfo.map(u => u.usuario);
        const cpfs = usuariosInfo.map(u => u.cpf);
        let erroEncontrado = false;

        for (const usuario of usuarios) {
        
          if (usuario == cadastro.usuario) {
            alert("usuario já cadastrado!");
            erroEncontrado = true;
            break;
          }
          
        }
        if (erroEncontrado === false)
          {
          
        
         for (const cpf of cpfs) 
          {
        
          if (cpf == cadastro.cpf) {
            alert("cpf já cadastrado!");
            erroEncontrado = true;
            break;
          }
          
        }
       }

       if (erroEncontrado === true)
       {
          return;
       }

    else{
      if (cadastro.tipo == 'usuario') 
    {
        
      
    await db.post({
    tipo: cadastro.tipo,
    nome: cadastro.nome,
    usuario: cadastro.usuario,
    senha: cadastro.senha,
    cpf: cadastro.cpf,
    telefone: cadastro.telefone,
    cep: cadastro.cep,
    rua: cadastro.rua,
    numero: cadastro.numero,
    carrinho:[],
    compras:[],
    });
    alert("Usuario cadastrado com sucesso!");
    window.location.href = "login.html";
  }
    else
    {
    await db.post({
    tipo: "administrador",
    nome: cadastro.nome,
    usuario: cadastro.usuario,
    senha: cadastro.senha,
    cpf: cadastro.cpf,
    carrinho:[],
    compras:[],
    });
    alert("Administrador cadastrado com sucesso!");
    }
       }
  }
  
  catch (error) 
  {
     console.log("Erro ao salvar",error);
  }
  
}

export async function salvarProduto(produto) {
   try
   {
    const imagemBase64 = await converterImagem(produto.imagem);
    console.log(imagemBase64);
    await db.post(
      {
        tipo : "produto",
        titulo: produto.titulo,
        descricao: produto.descricao,
        categoria: produto.categoria,
        imagem: imagemBase64,
        preco:Number(produto.preco),
        estoque: produto.estoque,
        classificacao: 0,
        quantidadeAvaliacao: 0

      })
    alert("Produto salvo com sucesso");
   }
   catch
   {
      alert("Erro ao salvar");
   }
 
}
async function converterImagem(imagem) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(imagem);
  });
}


export async function procurarId(id) {
  try {
    const produto = await db.get(id.toString());
    return produto;
  }
  catch {
    console.log(`id nao encontrado`);
    return false;

  }
}





export async function procurarCategoria(categoriaAlvo) {
  const todos = await db.allDocs({ include_docs: true });
  const produtos = [];
  try {
    for (const linha of todos.rows) {
      const produto = linha.doc;
      if (produto.categoria === categoriaAlvo) {
        produtos.push(produto)
      }

    }
    return produtos;
  }
  catch (erro) {
    console.log('Sem Produtos nesta categoria', erro);
  }
}

export async function procurarUsuario(login)
{
  try{
    const info = await db.allDocs({ include_docs: true });
    const usuariosInfo = info.rows.map(row => row.doc);
    const credenciais = usuariosInfo.map(u => ({
    usuario: u.usuario,
    senha: u.senha,
    id: u._id,
    
    }));
    let logado = false;
    


    for (const usuario of credenciais) {
   
      if (usuario.usuario == login.usuario && usuario.senha == login.senha) 
      {  
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('usuarioID', usuario.id);
        logado = true;
        break;
        
      }
    }
    if (logado == true) 
    {
      alert("Usuario logado com sucesso!");  
      return true;
      
    }
     else 
    {
      alert("Usuario ou senha incorretos!");
      return false;
    }
  }
  catch(erro)
  {
      alert("Erro no sistema tente novamente mais tarde!",erro);
  }
}


export async function salvarProdutoCarrinho(produtoId,usuario) 
{
  
    try
    {
      if (usuario.carrinho != '') 
      {
        for (const carrinho of usuario.carrinho) 
        {
          if (carrinho.id === produtoId) 
          {
             alert("Produto já adicionado no carrinho");
             return;
          }
        }
      }
      usuario.carrinho.push({    
        
        id: produtoId,
        quantidade: 1,
        check: true
        });

        await db.put(usuario);
        alert("Produto adicionado com sucesso");


    }
    catch
    {
      console.log("Erro em salvar produto");
    }
    
        
     
}



