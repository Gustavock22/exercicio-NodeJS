import promptSync from 'prompt-sync';
import pg from 'pg';
const { Client } = pg;

const alunos = new Client({
    host:       'localhost',
    port:       5432,
    user:       'postgres',
    password:   'root',
    database:   'escola_db' 
});

async function escolaDB(){
    try{
        await alunos.connect();

        const totalAlunos = await alunos.query('SELECT COUNT(*) FROM alunos');
        console.log("Total de alunos: ", totalAlunos.rows[0]);

        const mediaTurma = await alunos.query('SELECT AVG(nota) FROM alunos');
        console.log("Média da turma: ", mediaTurma.rows[0]);

    } catch(erro){
        console.log('❌ Ocorreu um erro:', erro.message);
    } finally{
        await alunos.end();
        console.log('🔌 Conexão encerrada.');
    }
}

escolaDB();