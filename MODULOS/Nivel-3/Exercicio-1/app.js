const arquivo = require("./arquivo");


arquivo.criarArquivo("log.txt", "Primeira mensagem no arquivo!");

const conteudo = arquivo.lerArquivo("log.txt");

console.log("Conteúdo do arquivo:");
console.log(conteudo);