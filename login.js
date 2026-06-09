import { procurarId, procurarUsuario, salvarProdutoCarrinho } from "./db.js";

async function logar() {
    try {
        const usuarioId = document.getElementById('usuario1').value;
        const senhaId = document.getElementById('senha').value;
        const login = {
            usuario: usuarioId,
            senha: senhaId

        };
        const logado = await procurarUsuario(login);
        
        if (logado === true) {
           
           const idAtual = localStorage.getItem('usuarioID');
           const usuario = await procurarId(idAtual);
           const pendentes = JSON.parse(localStorage.getItem('produtosPendentes') || '[]');
           for (const pendente of pendentes) 
           {
            await salvarProdutoCarrinho(pendente.id,usuario);
           }
           localStorage.removeItem('produtosPendentes');
           window.location.href = "index.html";
        }
    }
    catch {
        alert("Erro no sistema logar tente novamente mais tarde");
    }

}

export async function usuarioLogado(id) {
    try {

        console.log("Dentro da função usuarioLogado!");
        const usuario = await procurarId(id);
        const nome = await formatarNomeUsuario(usuario.nome);
        const btnLogin = document.getElementById('btn-login');
        const btnCadastro = document.getElementById('btn-cadastro');
        const html = document.getElementById('usuario');
        document.querySelector('.botoes').style.display = 'none';
        html.style.display = 'flex';
        if (usuario.tipo === 'usuario') 
        {
            
        console.log("usuario");
        html.innerHTML +=
        `
        <div class="usuario-logado">Usuário:${nome}</div>
        <div class="logado-botoes">
        <button onclick="deslogar()"class="sair">Sair</button>
        <button onclick="window.location.href='compras.html'"class="compras">Compras</button> 
        <button onclick="window.location.href='carrinho.html'"><img src="imagens/carrinho-icone.png" class="icone"></button>
     
        </div>
        `
        }
        else
        {
        console.log("adm");
        html.innerHTML +=    
        `
        <div class="botao-adm">
        <button onclick="window.location.href='administrador.html'">Modo<br>ADM</button>
        </div>
        <div class="usuario-logado">Usuário:${nome}</div>
        <div class="logado-botoes">
        <button onclick="deslogar()"class="sair">Sair</button>
        <button onclick="window.location.href='compras.html'"class="compras">Compras</button> 
        <button onclick="window.location.href='carrinho.html'"><img src="imagens/carrinho-icone.png" class="icone"></button>
        
     
        </div>
        `
        }
    }
    catch (error) {
        console.log(error);
        return;

    }



}

async function deslogar() {
    const deslogar = confirm("Tem certeza que deseja deslogar?");
    if(deslogar)
    {
    localStorage.setItem('isLogged', 'false');
    window.location.href = `index.html`;
    }

}

async function formatarNomeUsuario(nomeCompleto) {
    if (!nomeCompleto) return "";
    return nomeCompleto.trim().split(' ')[0];
}

window.logar = logar;
window.deslogar = deslogar;