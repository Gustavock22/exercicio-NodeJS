import promptSync from 'prompt-sync';
import pg from 'pg';

const prompt = promptSync();
const { Client } = pg;

const jogos = new Client({
    host:       'localhost',
    port:       5432,
    user:       'postgres',
    password:   'root',
    database:   'rpg_db' 
});

async function listarJogos(){
    try{
        const listarJogos = await jogos.query('SELECT * FROM jogos ORDER BY genero, titulo');
            if (listarJogos.rows.length === 0) {
                console.log('A loja está vazia no momento.');
            } else {
                listarJogos.rows.forEach(jogo => {
                    console.log(`[${jogo.id}] ${jogo.titulo}`);
                    console.log(`    Gênero: ${jogo.genero} | Nota: ${jogo.nota} | Ano de lançamento: ${jogo.lancamento}`);
                    console.log('    ─────────────────────────────────────────');
                });
                console.log(`\nTotal de itens: ${listarJogos.rows.length}`);
            };
        
    } catch (erro) {

        console.log('❌ Erro ao listar itens:', erro.message);

    }
}

async function atualizarNotas(){
    try{

        const id = Number(prompt("Digite o ID do jogo: "));
        const novaNota = Number(prompt("Digite a nova nota: "));

        const query = ` UPDATE jogos SET nota = $1 WHERE id = $2 RETURNING * `;

        const atualizaNota = await jogos.query(query, [novaNota, id]);

        if (atualizaNota.rows.length === 0) {
            console.log('\n❌ Jogo não encontrado.');
        } else {
            console.log('\n✅ Nota atualizado com sucesso!');
            console.log(`${atualizaNota.rows[0].titulo} → Nova nota: ${atualizaNota.rows[0].nota}`);
        }
    } catch (erro) {
        console.log('❌ Erro ao listar jogos:', erro.message);
    }
}
async function main() {
    await jogos.connect();

    await listarJogos();
    await atualizarNotas();
    await listarJogos();

    await jogos.end();
}

main();