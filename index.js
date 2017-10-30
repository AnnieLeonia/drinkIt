const conn        = require('./connect.js');
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){

  res.render('homepage', { title: 'Homepage' });
});

app.get('/drinks', function(req, res){
  conn.query('SELECT name FROM recipes', function (error, drinks) {

    res.render('drinks', { title: 'Drinks', drinks});
  });
});

app.get('/drinks/:name', function(req, res){
  conn.query('SELECT name, description FROM recipes WHERE name = ?', [req.params.name],
    function(error, recipes){
      if(recipes.length > 0){
        const drinkName = recipes[0].name;
        const drinkDescription = recipes[0].description;
        conn.query('SELECT ingredient, amount FROM recipeitems WHERE recipe = ?', [drinkName],
          function(error, recipeitems){
            res.render('drink', { title: drinkName + ' - Drink.It', drinkName, recipeitems});
          }
        );
      } else {
        res.send("Sorry, " + req.params.name + " does not exist");
      }
    });
});

app.get('/about', function(req, res){
  res.render('about', {title: 'About - Drink.It'})
});

app.get('/newDrink', function(req, res){
  res.render('newDrink', {title:'New Drink - Drink.It'})
});

app.post('/newDrink', function(req, res){
  const drinkName = req.body.name;
  const drinkDescription =  req.body.description;
  conn.query('INSERT INTO recipes(name, description) values (?, ?)',
    [drinkName,drinkDescription], function(error){
      if(error==null){
        res.redirect('/drinks/' + drinkName);
      } else {
        console.log(error);
        res.send("Sorry, " + drinkName + " could not be created!");
      }
    });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is running.');
});