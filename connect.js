var mysql      = require('mysql');
require('dotenv').config();
var connection = null;

function connectDb(){
  if (connection){
    return connection;
  }
  connection = mysql.createConnection(process.env.DATABASE_URL);
  return connection

}

module.exports = connectDb();