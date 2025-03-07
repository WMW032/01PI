const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configurar o middleware para interpretar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (Página de Login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário e a senha são "admin"
    if (username === 'admin' && password === 'admin') {
        // Redireciona para o dashboard
        res.redirect('/dashboard');
    } else {
        // Se as credenciais estiverem erradas, volta para o login com mensagem de erro
        res.send('<script>alert("Usuário ou senha incorretos!"); window.location="/";</script>');
    }
});

// Rota do Dashboard (somente acessível após login)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
