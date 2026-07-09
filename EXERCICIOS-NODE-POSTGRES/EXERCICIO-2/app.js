import promptSync from 'prompt-sync';
import pg from 'pg';
const { Client } = pg

const jogos = new Client({
    host:       'localhost',
    port:       5432,
    user:       'postgres',
    password:   'root',
    database:   'escola_db' 
});

async function escolaDB(){
    try{
        await jogos.connect();

        const mediaJogos = await jogos.query('SELECT AVG(nota) AS media FROM jogos');
        console.log("Média:", Number(mediaJogos.rows[0].media).toFixed(2));
        
        const jogosAcimaMedia = await jogos.query(`SELECT titulo, nota FROM jogos WHERE nota > (SELECT AVG(nota) FROM jogos) `);
        
        console.log("\nJogos acima da média:");
        
        let cont = 0;
        jogosAcimaMedia.rows.forEach(jogo => {
            console.log(`${jogo.titulo} - ${jogo.nota}`);
            cont++;
        });
        
        console.log("\nJogos e suas notas:");
        const nomeNota = await jogos.query('SELECT titulo, nota FROM jogos');
        console.log(nomeNota.rows);

        console.log(`${cont} Jogos acima da média`);

    } catch(erro){
        console.log('❌ Ocorreu um erro:', erro.message);
    } finally{
        await jogos.end();
        console.log('🔌 Conexão encerrada.');
    }
}
escolaDB();