import { salvarUsuarioBanco, procurarId, procurarUsuario, salvarProdutoCarrinho } from "./db.js";
import { validarCPF } from "./utils.js";

async function cadastroUsuario() {
    try {
        const nome = document.getElementById('nome').value;
        const usuario = document.getElementById('usuario1').value;
        const senha = document.getElementById('senha').value;
        const senha2 = document.getElementById('senha2').value;
        let cpf = document.getElementById('cpf').value;
        let telefone = document.getElementById('telefone').value;
        let cep = document.getElementById('cep').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        cpf = cpf.replace(/[^\d]+/g, '');
        telefone = telefone.replace(/[^\d]+/g, '');
        cep = cep.replace(/[^\d]+/g, '');

        if (nome === '' || usuario === '' || senha === '' || senha2 === '' || cpf === '' || telefone === ''|| cep === ''|| rua === '' || numero === '') {
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
        else if (telefone.length != 11) {
            alert("Telefone inválido!");
            return;
        }
        const cadastro = {
            tipo: 'usuario',
            nome: nome,
            usuario: usuario,
            senha: senha,
            cpf: cpf,
            telefone: telefone,
            cep : cep,
            rua : rua,
            numero : numero,
        };
        await salvarUsuarioBanco(cadastro);
    }
    catch {
        alert("Erro no sistemas tente  novamente mais tarde");

    }


}


window.cadastroUsuario = cadastroUsuario;

