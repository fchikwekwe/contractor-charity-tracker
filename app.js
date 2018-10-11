const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
// const moment = require('moment')

const Event = require('./models/event');
const Donation = require('./models/donation');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker', {useNewUrlParser: true});


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json());

// app.locals.moment = moment;

require('./controllers/events.js')(app);
require('./controllers/donations.js')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
