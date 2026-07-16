import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt =  promptSync();

const ecommerce = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'ecommerce_db'
});

async function historicoPedidos() {
    try{
        await ecommerce.connect();

        let nome = prompt("Nome do cliente: ");

        const historico = await ecommerce.query(`
            SELECT
                pr.nome AS produto,
                pd.quantidade,
                pr.preco,
                (pr.preco * pd.quantidade) AS total
            FROM pedidos pd
            INNER JOIN clientes cl ON pd.cliente_id = cl.id
            INNER JOIN produtos pr ON pd.produto_id = pr.id
            WHERE cl.nome ILIKE $1
            `, [`%${nome}%`]);

        if (historico.rows.length === 0) {
            console.log("Nenhum pedido encontrado para esse cliente.");
            return;
        }

        historico.rows.forEach(item => {
            console.log(`
        Produto: ${item.produto}
        Quantidade: ${item.quantidade}
        Preço: R$ ${item.preco}
        Total: R$ ${item.total}
        -------------------------
        `);
        });




    } catch (erro) {
        console.log("❌ Erro ao listar itens:", erro.message);
    } finally {
        await ecommerce.end();
        console.log("Conexão encerrada")
    }
}
historicoPedidos();