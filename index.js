const conn        = require('./connect.js');
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const {homepage, about, drink, ingredient} = require('./controllers')

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', homepage.index);
app.get('/about', about.index);

app.get('/drinks', drink.listAll);
app.get('/drinks/:name', drink.show);
app.get('/newDrink', drink.prepare);
app.post('/newDrink', drink.create);

app.post('/newIngredient', ingredient.create);

app.listen(process.env.PORT || 8080, function () {
  console.log('App is running.');
});