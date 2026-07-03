const verificar = require("./validacoes");

console.log(verificar.validarNome("Gustavo"));
console.log(verificar.validarNome("Gu"));
console.log(verificar.validarIdade(-1));
console.log(verificar.validarIdade(16));