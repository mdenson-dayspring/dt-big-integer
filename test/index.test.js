var should = require('chai').should(),
    bigInt = require('../index');

describe('#construct', function() {
  it('0', function() {
    bigInt(0).toString().should.equal('0');
  }),
  it('1', function() {
    bigInt(1).toString().should.equal('1,1');
  }),
  it('-1', function() {
    bigInt(-1).toString().should.equal('-1,1');
  }),
  it('100', function() {
    bigInt(100).toString().should.equal('1,100');
  }),
  it('-100', function() {
    bigInt(-100).toString().should.equal('-1,100');
  }),
  it('999', function() {
    bigInt(999).toString().should.equal('1,999');
  }),
  it('-999', function() {
    bigInt(-999).toString().should.equal('-1,999');
  }),
  it('1000', function() {
    bigInt(1000).toString().should.equal('2,0,1');
  }),
  it('-1000', function() {
    bigInt(-1000).toString().should.equal('-2,0,1');
  }),
  it('123456789', function() {
    bigInt(123456789).toString().should.equal('3,789,456,123');
  });
});

