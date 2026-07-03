const fs = require("fs");

function formatarData() {
    return new Date().toLocaleString();
}

function registrarLog(nivel, mensagem) {
    const data = formatarData();

    const log = `[${nivel}] [${data}] ${mensagem}\n`;

    fs.appendFileSync("logs.txt", log);
}

module.exports = {
    registrarLog
};