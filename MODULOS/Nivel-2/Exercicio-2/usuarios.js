const usuarios = [];

function criarUsuario(nome, idade){
    const usuario = {
        nome,
        idade
    };
    usuarios.push(usuario);
}

function listarUsuarios() {
    return usuarios;
}

function buscarUsuario(nome) {
    return usuarios.find(usuario => usuario.nome === nome);
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuario
};