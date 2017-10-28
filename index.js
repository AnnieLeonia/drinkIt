require('./connect.js');

const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('homepage', { title: 'Homepage' });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is running.');
});
