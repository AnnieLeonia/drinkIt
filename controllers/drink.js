const conn        = require('../connect.js');

exports.listAll = function(req, res){
  conn.query('SELECT name FROM recipes', function (error, drinks) {
    res.render('drinks', { title: 'Drinks', drinks})
  })
}

exports.show = function(req, res){
  conn.query('SELECT name, description FROM recipes WHERE name = ?', [req.params.name],
    function(error, recipes){
      if(recipes.length > 0){
        const drinkName = recipes[0].name;
        const drinkDescription = recipes[0].description;
        conn.query('SELECT ingredient, amount FROM recipeitems WHERE recipe = ?', [drinkName],
          function(error, recipeitems){
            res.render('drink', { title: drinkName + ' - Drink.It', drinkName, drinkDescription, recipeitems});
          }
        );
      } else {
        res.send("Sorry, " + req.params.name + " does not exist");
      }
    });
}

exports.prepare = function(req, res){
  conn.query('SELECT name FROM ingredients', function(error, ingredients){
    res.render('newDrink', {title:'New Drink - Drink.It', ingredients})
  });
}

exports.create = function(req, res){
  const drinkName = req.body.name;
  const drinkDescription =  req.body.description;
  const recipeitems = req.body.recipeitems;
  conn.query('INSERT INTO recipes(name, description) values (?, ?)',
    [drinkName,drinkDescription], function(error){
      if(error==null){
        let allItems = recipeitems.map(recipeitem=>
          [recipeitem.amount, recipeitem.ingredient, drinkName]);
        conn.query('INSERT INTO recipeitems(amount, ingredient, recipe) values ?',
          [allItems], function(error){
            if(error==null){
              res.redirect('/drinks/' + drinkName);
            }else{
              console.log(error);
              res.send("Sorry, some of the items for " + drinkName + " could not be created!");
            }
          });
      } else {
        console.log(error);
        res.send("Sorry, " + drinkName + " could not be created!");
      }
    });
}

