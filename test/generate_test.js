var filter = require('../src/lib/filter'),
    assert = require('assert');

describe('filter', function() {
    describe('extract', function() {
        it('should return an error when request fails', function() {
            var input = 'not a uri';
            var result = filter.generate(input, function(err, result){
                assert(result instanceof Array);
                assert(!err);
                assert.equal(result[0].status, 'error');
                assert.equal(result[0].code, null);
                assert.equal(result[0].uri, input);
            });
        });
    });
});

