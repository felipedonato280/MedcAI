const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Meliodas.7',
  database: 'DBMedcAI'
};

const connection = mysql.createConnection(dbConfig);

// Estabelece a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso');
});

module.exports = connection;

