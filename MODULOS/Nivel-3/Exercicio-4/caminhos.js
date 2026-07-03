const path = require("path");

function montarCaminho(nomeArquivo){
    const caminho = path.join(__dirname, nomeArquivo, "log.txt");
    console.log("");
    console.log("CAMINHO: ", caminho);
    console.log("");
}

module.exports = {
    montarCaminho
};