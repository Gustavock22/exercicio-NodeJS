import promptSync from 'prompt-sync';
const prompt = promptSync();

import pg from 'pg';
const { Client } = pg;

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

        console.log('\n🛒 CADASTRO DE JOGO\n');

        let condicao = false;

        let genero;  
        let anoLancamento;
        let nota; 
        let titulo ;


        while(condicao != true){

            titulo             = prompt('Título do jogo: ');
            nota              = Number(prompt('Nota: '));
            anoLancamento     = Number(prompt('Ano de lançamento: '));
            genero            = prompt('Gênero: ');
    
            if((titulo === "")||((nota < 0)||(nota > 10)) || (anoLancamento < 1970)){
                console.log("Erro: alguma informação está incorreta");
            } else{
                condicao = true;
            }

            const query = `INSERT INTO jogos (titulo, genero, nota, lancamento) VALUES ($1, $2, $3, $4) RETURNING * `;
            
            const valores = [
                titulo,
                genero,
                nota,
                anoLancamento
            ];

            const resultado = await jogos.query(query, valores);

            console.log('\n✅ Jogo cadastrado com sucesso!');
            console.log('Dados salvos:', resultado.rows[0]);
        }

    } catch (erro) {
        console.log('❌ Erro ao cadastrar jogo:', erro.message);

    } finally {
        await jogos.end();
    }
}

escolaDB();