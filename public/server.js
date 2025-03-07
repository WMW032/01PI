const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Configurar a conexão com o PostgreSQL
const pool = new Pool({
    user: "postgres", // Substitua pelo seu nome de usuário do PostgreSQL
    host: "localhost", // Ou o endereço do seu servidor PostgreSQL
    database: "postgres", // Substitua pelo nome do seu banco de dados
    password: "admin", // Substitua pela sua senha do PostgreSQL
    port: 5432, // Porta padrão do PostgreSQL
});

// Rota para listar insumos
app.get("/api/insumos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM insumos");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Rota para obter um insumo específico por ID
app.get("/api/insumos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM insumos WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para adicionar um novo insumo
app.post("/api/insumos", async (req, res) => {
    const { nome, categoria, quantidade } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO insumos (nome, categoria, quantidade) VALUES ($1, $2, $3) RETURNING id",
            [nome, categoria, quantidade]
        );
        res.json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Rota para atualizar um insumo existente
app.put("/api/insumos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, categoria, quantidade } = req.body;
    try {
        const result = await pool.query(
            "UPDATE insumos SET nome = $1, categoria = $2, quantidade = $3 WHERE id = $4",
            [nome, categoria, quantidade, id]
        );
        res.json({ updated: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar um insumo
app.delete("/api/insumos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM insumos WHERE id = $1", [id]);
        res.json({ deleted: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Servir arquivos estáticos do front-end
app.use(express.static("public"));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});