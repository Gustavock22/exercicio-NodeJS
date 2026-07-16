import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const ecommerce = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'ecommerce_db'
});

async function listarProdutos() {
    try {
        await ecommerce.connect();

        const listandoProdutos = await ecommerce.query(`
            SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria
            FROM produtos p
            INNER JOIN categorias c
            ON p.categoria_id = c.id
        `);

        console.log("=== LISTA DE PRODUTOS ===");

        listandoProdutos.rows.forEach(produto => {
            console.log(`
ID: ${produto.id}
Produto: ${produto.nome}
Preço: R$ ${produto.preco}
Estoque: ${produto.estoque}
Categoria: ${produto.categoria}
-------------------------
`);
        });

        const totalProdutos = await ecommerce.query(`
            SELECT c.nome AS categoria, COUNT(p.id) AS total_produtos
            FROM categorias c
            INNER JOIN produtos p
            ON p.categoria_id = c.id
            GROUP BY c.nome
            ORDER BY c.nome
        `);

        console.log("\n=== TOTAL DE PRODUTOS POR CATEGORIA ===\n");

        totalProdutos.rows.forEach(item => {
            console.log(`${item.categoria}: ${item.total_produtos}`);
        });

    } catch (erro) {
        console.log("❌ Erro ao listar itens:", erro.message);
    } finally {
        await ecommerce.end();
        console.log("🔌 Conexão encerrada.");
    }
}

listarProdutos();