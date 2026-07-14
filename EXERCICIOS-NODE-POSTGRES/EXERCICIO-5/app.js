import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

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

async function deletarJogo(){
    try{
        const id = Number(prompt("Digite o ID do jogo: "));
        const confirmacao = prompt(`⚠️  Tem certeza? Isso não pode ser desfeito. (s/n): `);

        if (confirmacao.toLowerCase() !== 's') {
            console.log('\n❌ Operação cancelada.');
            return;
        }
        
        

        const query = ('DELETE FROM jogos WHERE id = $1 RETURNING titulo');

        
        const resultado = await jogos.query(query, [id]);

        if (resultado.rows.length === 0) {
            console.log('\n❌ Produto não encontrado.');
        } else {
            console.log(`\n✅ "${resultado.rows[0].titulo}" removido com sucesso.`);
        }

    } catch (erro) {

        console.log('❌ Erro ao remover jogo:', erro.message);

    }
}

async function main() {
    await jogos.connect();

    await listarJogos();
    await deletarJogo();
    await listarJogos();

    await jogos.end();
}

main();


