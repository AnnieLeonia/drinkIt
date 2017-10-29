const conn    = require('./connect.js');
const express = require('express');
const app     = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

  res.render('homepage', { title: 'Homepage' });
});

app.get('/drinks', function(req, res){
  conn.query('SELECT name FROM recipes', function (error, drinks) {

    res.render('drinks', { title: 'Drinks', drinks});
  });
});

app.get('/drinks/:name', function(req, res){
  const drinkName = req.params.name;
  conn.query('SELECT ingredient, amount FROM recipeitems WHERE recipe = "' + drinkName + '"', function(error, recipeitems){

    res.render('drink', { title: drinkName + ' - Drink.It', drinkName, recipeitems});
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is running.');
});