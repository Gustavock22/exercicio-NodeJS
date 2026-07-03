function validarNome(nome){
    if(nome.length < 3){
        return `Erro: Nome menor que 3 letras`;
    }else{
        return `Olá ${nome}`;
    }
}
function validarIdade(idade){
    if(idade < 0){
        return `Erro: idade menor que 0`;
    }else{
        return `Idade: ${idade}`
    }
}

module.exports = {
    validarNome,
    validarIdade
};