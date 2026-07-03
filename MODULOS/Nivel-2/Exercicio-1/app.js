const validarNumero = require("./utils/validacoes");
const calc = require("./utils/operacoes");


console.log(validarNumero(2,2));
console.log(validarNumero("oi",2));


console.log(calc.somar(2,3));
console.log(calc.menos(5,3));
console.log(calc.dividir(50,2));
console.log(calc.dividir(10,0));
console.log(calc.multiplicar(2,3));