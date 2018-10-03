

app.get('/', (req, res) => {
    Event.find()
    .then events => {
        res.render('index', { events: events });
    }.catch(err => {
        console.log(err);
    })

})
