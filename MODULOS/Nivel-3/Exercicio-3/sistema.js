const os = require("os");

function mostrarInfoSistema(){
    const sistema = os.type();
    const arquitetura = os.arch();

    const memoriaTotal = os.totalmem() / 1024 / 1024;
    const memoriaLivre = os.freemem() / 1024 / 1024;

    console.log("=== INFORMAÇÕES DO SISTEMA ===");
    console.log("Sistema operacional:", sistema);
    console.log("Arquitetura do processador:", arquitetura);
    console.log("Memória total:", memoriaTotal.toFixed(2), "MB");
    console.log("Memória livre:", memoriaLivre.toFixed(2), "MB");
}

module.exports = {
    mostrarInfoSistema
};