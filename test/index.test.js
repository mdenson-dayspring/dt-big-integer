var should = require('chai').should(),
    BigInt = require('../index').BigInt;

describe('#escape', function() {
  it('converts & into &amp;', function() {
    escape('&').should.equal('&amp;');
  });
});

