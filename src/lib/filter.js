var request = require('request');

/*
 * Return an object containing meta-data on a resource at parameter uri
 * Uri
 * Mime-Type
 * Language
 * Date (last modified)
 * Size
 * Title? - from html resources
 */
exports.generate = function(uri, callback) {
    // make a get for uri
    request(uri, function(error, response, body) {
         if (!error && response.statusCode == 200) {
             console.log('Success : code ' + response.statusCode );
             callback({
                uri: uri,
                type: response.headers['content-type'],
                language: response.headers['content-language'],
                date: response.headers['last-modified'],
                size: response.headers['content-length'],
             });
          } else {
             console.log('Error :' + error + ' : code ' + response.statusCode );
             callback({
                status: 'error', 
                code: response.statusCode,
                uri: uri
             });
          }
    });
};
