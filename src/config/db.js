const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // Coloque o seu usuário do MySQL
    password: '',        // Coloque a sua senha do MySQL
    database: 'gestao_residuos',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;
