var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pranjal@123",
  database: "sams_project",
  waitForConnections: true,
  connectionLimit: 100,
  multipleStatements: true,
  timezone: 'Asia/Kolkata',
});

module.exports = pool;