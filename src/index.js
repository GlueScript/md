var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({description : "Resource meta-data - generate metadata on a resource at a uri"});
});

// expects either a single uri or a json array in the post body
app.post('/', function(req, res) {
    console.log('using : ' + req.body);
    filter.generate(req.body, function(err, data) {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json(data);
        }
    });
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('info', 'Running md service on http://localhost:' + PORT);
