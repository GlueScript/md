var app = require('express')(),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml'}));

// App
app.get('/', function (req, res) {
    res.json({"description":"Resource meta-data - generate metadata on a resource at a uri"});
});

app.post('/', function(req, res) {
    // validation? let the filter module do that?
    var result = filter.generate(req.body, function(data) {
        res.json(data);
    });
});

// use env.PORT if set
var PORT = process.env.PORT || 80;

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
