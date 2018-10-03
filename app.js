const express = require('express');
const app = express();
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/charity-tracker', { useMongoClient: true });

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));


app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
