let nivel = Number(process.argv[2]);

if(nivel >= 1 && nivel <= 10 ){
    console.log("Iniciante");
}else if(nivel >= 11 && nivel <= 30){
    console.log("Intermediário");
}else{
    console.log("Veterano");
}