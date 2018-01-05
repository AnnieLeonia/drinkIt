const conn        = require('../connect.js');

exports.create = function(req, res){
  console.log(req)
  const {name, type, description, percentage} = req.body;
  conn.query('INSERT INTO ingredients(name, type, description, percentage)'
    + 'values (?, ?, ?, ?)', [name, type, description, percentage], function(error){
      if(error){
        console.log(error);
        res.send("Sorry, the new ingredient could not be created!");
      }
    });
}

