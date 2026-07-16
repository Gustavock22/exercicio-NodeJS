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

async function verificandoEstoque() {

    try {
        await ecommerce.connect();

        const listandoClientes = await ecommerce.query(`
            SELECT id, nome
            FROM clientes
            ORDER BY nome;
        `);

        listandoClientes.rows.forEach(cliente => {
            console.log(`
            ---------------------------------------
            Nome: ${cliente.nome}
            ID: ${cliente.id}
            ---------------------------------------
            `);
        });

        let idCliente = Number(prompt("ID do cliente: "));

        const listandoCliente = await ecommerce.query(`
            SELECT id, nome
            FROM clientes
            WHERE id = $1;
        `, [idCliente]);

        if (listandoCliente.rows.length === 0) {
            console.log("Cliente não encontrado.");
            return;
        }

        const cliente = listandoCliente.rows[0];

        const listandoProdutos = await ecommerce.query(`
            SELECT id, nome, preco, estoque
            FROM produtos
            WHERE estoque > 0
            ORDER BY nome;
        `);

        listandoProdutos.rows.forEach(produto => {
            console.log(`
            ---------------------------------------
            Nome: ${produto.nome}
            ID: ${produto.id}
            Preço: R$ ${produto.preco}
            Estoque: ${produto.estoque}
            ---------------------------------------
            `);
        });

        let idProdutos = Number(prompt("ID do produto: "));

        const listandoProduto = await ecommerce.query(`
            SELECT id, nome, preco, estoque
            FROM produtos
            WHERE id = $1;
        `, [idProdutos]);

        if (listandoProduto.rows.length === 0) {
            console.log("Produto não encontrado.");
            return;
        }

        const produto = listandoProduto.rows[0];

        let quantidade = Number(prompt("Quantidade desejada: "));

        if (quantidade > produto.estoque) {
            console.log(`Estoque insuficiente. Disponível: ${produto.estoque} unidades.`);
            return;
        }

        console.log(`
            CLIENTE:
            ---------------------------------------
            Nome: ${cliente.nome}
            ID: ${cliente.id}
            ---------------------------------------

            PRODUTO:
            ---------------------------------------
            Nome: ${produto.nome}
            ID: ${produto.id}
            Preço: R$ ${produto.preco}
            Estoque disponível: ${produto.estoque}
            Quantidade solicitada: ${quantidade}
            ---------------------------------------
            `);
        
        let novoEstoque = produto.estoque - quantidade;

        console.log(`
        PEDIDO CONFIRMADO
        ---------------------------------------
        Cliente: ${cliente.nome}

        Produto: ${produto.nome}
        Quantidade comprada: ${quantidade}

        Estoque anterior: ${produto.estoque}
        Novo estoque: ${novoEstoque}
        ---------------------------------------
        `);


    } catch (erro) {
        console.log("❌ Erro:", erro.message);
    } finally {
        await ecommerce.end();
        console.log("Conexão encerrada");
    }

}

verificandoEstoque();