function somar(a,b){
    return a + b;
}
function menos(a,b){
    return a - b;
}
function dividir(a,b){
    if (b === 0){ return console.log("Erro: Divisão por zero")}else{return a / b;}
}
function multiplicar(a,b){
    return a * b;
}

module.exports = {
    somar,
    menos,
    dividir,
    multiplicar
};