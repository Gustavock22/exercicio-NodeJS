let num1 = Number(process.argv[2]);
let num2 = Number(process.argv[3]);

let soma = num1 + num2;
let divi = num1 / num2;
let mult = num1 * num2;
let meno = num1 - num2;

console.log("Numero 1: ", num1);
console.log("Numero 2: ", num2);

console.log(`Soma: ${soma}\nSubtração: ${meno}\nMultiplicação: ${mult}\nDivisão: ${divi}`);