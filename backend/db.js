const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'glaginestra',
  password: 'Password2003$',
  database: 'login_db'
});

db.connect((err) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL 🚀");
  }
});

module.exports = db;