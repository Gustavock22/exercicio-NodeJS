function validarNumero (a,b){
    if(typeof a === "number" && typeof b === "number"){
        return `É um número`;
    } else {
        return `Não é um número`;
    }
}

module.exports = validarNumero;
