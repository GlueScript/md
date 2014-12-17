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
    // make a HEAD request for uri
    request.head(uri, function(error, response, body) {
         if (!error && (response && response.statusCode == 200)) {
             console.log('Success : code ' + response.statusCode );
             callback(null, {
                uri: uri,
                type: response.headers['content-type'],
                language: response.headers['content-language'],
                date: response.headers['last-modified'],
                size: response.headers['content-length'],
             });
          } else {
             console.log(error + ' : response ' + response);
             callback(null, {
                status: 'error', 
                code: response && response.statusCode,
                uri: uri
             });
          }
    });
};
