var mysql      = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection(process.env.DATABASE_URL);

connection.query('show tables', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

module.exports = connection;