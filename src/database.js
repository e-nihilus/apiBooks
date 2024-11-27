const mysql = require("mysql2");

const pool = mysql.createPool(
                {
                    host                : 'localhost',
                    user                : 'root',
                    password            : 'criptoria',
                    database            : 'AppBooks',
                    waitForConnections  : true,
                    connectionLimit     : 10,
                    maxIdle             : 10,
                    idleTimeout         : 60000,
                    queueLimit          : 0
                }).promise();

console.log("Conexion exitosa");

module.exports = {pool};