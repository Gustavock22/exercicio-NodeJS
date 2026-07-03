const usuarios = require("./usuarios");

usuarios.criarUsuario("Gustavo", 20);
usuarios.criarUsuario("Maria", 25);
usuarios.criarUsuario("João", 30);

console.log("Lista de usuários:");
console.log(usuarios.listarUsuarios());

console.log("\nBusca por Maria:");
console.log(usuarios.buscarUsuario("Maria"));