var mysql = require('mysql2');
const dbconn = mysql.createPool({
    host: '127.0.0.1',
    user: 'fishglory',
    password: 'Fishglory202@',
    database: 'fishglory',
    port: '3306',
    connectionLimit: 5
});

module.exports = {dbconn};