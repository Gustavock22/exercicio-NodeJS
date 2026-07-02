let nomeItem = process.argv[2];
let ouro     = Number(process.argv[3]);
let preco    = Number(process.argv[4]);

if(preco > ouro){
    console.log("Sem outro suficiente para comprar o ", nomeItem);
}else{
    console.log("Comprou o item com sucesseso");
}