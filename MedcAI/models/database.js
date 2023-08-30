const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3306;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Meliodas.7',
  database: 'DBMedcAI'
};

const connection = mysql.createConnection(dbConfig);

// Rota para cadastro de usuário
app.post('/cadastro', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    } else {
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
  });
});

// Rota para autenticação de usuário
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Erro na autenticação:', error);
      res.status(500).json({ error: 'Erro ao autenticar usuário' });
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Usuário autenticado com sucesso' });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
