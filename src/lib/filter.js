var request = require('request'),
    _ = require('underscore');

/*
 * Return an array of objects containing meta-data on a resource at uri
 * Uri
 * Mime-Type
 * Language
 * Date (last modified)
 * Size
 * Title? - from html resources
 */
exports.generate = function(input, callback) {
    
    input = _.isArray(input) ? input : [input];
    
    var output = [];
    
    _.each(input, function(uri) {
        // make a HEAD request for uri
        request.head(uri, function(error, response, body) {
            if (!error && (response && response.statusCode == 200)) {
                console.log('Success : code ' + response.statusCode );
                output.push(
                {
                    uri: uri,
                    type: response.headers['content-type'],
                    language: response.headers['content-language'],
                    date: response.headers['last-modified'],
                    size: response.headers['content-length'],
                });
             } else {
                console.log(error + ' : response ' + response);
                output.push(
                {
                    status: 'error', 
                    code: response && response.statusCode,
                    uri: uri
                });
            }
            if (output.length == input.length){
                callback(null, output);
            }
        });
    });
};
