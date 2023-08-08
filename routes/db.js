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

// git config --global user.email "you@example.com"
// git config --global user.name "Your Name"