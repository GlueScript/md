var request = require('request');

/*
 * Return an object containing meta-data on a resource at parameter uri
 * Mime-Type
 * Uri
 * Language
 * Size?
 * Title? - from html resources
 */
exports.generate = function(uri, callback) {
    // make a get for uri
    request(uri, function(error, response, body) {
         if (!error) {
             callback({
                status: 'success',
                data: {
                    uri: uri,
                    type: response.headers['content-type'],
                    language: response.headers['content-language'],
                    date: response.headers['date']
                }
             });
          } else {
             console.log('Error :' + error);
             callback({
                status: 'error', 
                data: {
                    uri: uri
                }
             });
          }
    });
};
