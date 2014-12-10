var filter = require('../src/lib/filter'),
    assert = require('assert');

describe('filter', function() {
    describe('extract', function() {
        it('should return an error when request fails', function() {
            var input = 'not a uri';
            var result = filter.generate(input, function(result){
                assert(result instanceof Object);
                assert.equal(result.status, 'error');
                assert.equal(result.code, null);
                assert.equal(result.uri, input);
            });
        });
    });
});

