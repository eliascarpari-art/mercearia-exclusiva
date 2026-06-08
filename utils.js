import { procurarId } from "./db.js";

export async function validarCPF(cpf) {



    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}


export async function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function acessarProduto(produtoId) {
 try {
    const produto = await procurarId(produtoId);
    
    if (produto)
    {
        window.location.href = `produto.html?id=${produtoId}`;    
    }
    else
    {
        alert("Produto não está mais disponível");
        return;
    }
    
 } 
 catch 
 {
    console.log("erro ao acessar produto");
 }
    

}

window.acessarProduto = acessarProduto;

