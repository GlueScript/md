var app = require('express')(),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

/*
* Get winston to log uncaught exceptions and to not exit
*/
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

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

logger.log('Running on http://localhost:' + PORT);
