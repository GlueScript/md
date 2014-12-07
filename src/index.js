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
// extend to accept a json array?
//app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json({description : "Resource meta-data - generate metadata on a resource at a uri"});
});

// expects a single uri in the post body
app.post('/', function(req, res) {
    console.log(req.body);
    filter.generate(req.body, function(data) {
        res.json(data);
    });
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('Running on http://localhost:' + PORT);
