var should = require('chai').should(),
    bigInt = require('../index');

describe('#factory bigInt()', function() {
  it('null input', function() {
    bigInt().toString().should.equal('0');
  }),
  it('bigInt input', function() {
    bigInt(bigInt(1)).toString().should.equal('1,1');
  }),
  it('javascript numbers input', function() {
    bigInt(0).toString().should.equal('0');
    bigInt(1).toString().should.equal('1,1');
    bigInt(-1).toString().should.equal('-1,1');
    bigInt(100).toString().should.equal('1,100');
    bigInt(-100).toString().should.equal('-1,100');
    bigInt(999).toString().should.equal('1,999');
    bigInt(-999).toString().should.equal('-1,999');
    bigInt(1000).toString().should.equal('2,0,1');
    bigInt(-1000).toString().should.equal('-2,0,1');
    bigInt(123456789).toString().should.equal('3,789,456,123');
  });
});

describe('#conversion', function() {
  it('to javascript numbers', function() {
    bigInt(0).toNumber().should.equal(0);
    bigInt(1).toNumber().should.equal(1);
    bigInt(-1).toNumber().should.equal(-1);
    bigInt(100).toNumber().should.equal(100);
    bigInt(-100).toNumber().should.equal(-100);
    bigInt(999).toNumber().should.equal(999);
    bigInt(-999).toNumber().should.equal(-999);
    bigInt(1000).toNumber().should.equal(1000);
    bigInt(-1000).toNumber().should.equal(-1000);
    bigInt(123456789).toNumber().should.equal(123456789);
  });
});

describe('#methods', function() {
  it('abs', function() {
    bigInt(0).abs().toNumber().should.equal(0);
    bigInt(1).abs().toNumber().should.equal(1);
    bigInt(-1).abs().toNumber().should.equal(1);
    bigInt(123456789).abs().toNumber().should.equal(123456789);
    bigInt(-123456789).abs().toNumber().should.equal(123456789);
  }),
  it('neg', function() {
    bigInt(0).neg().toNumber().should.equal(0);
    bigInt(1).neg().toNumber().should.equal(-1);
    bigInt(-1).neg().toNumber().should.equal(1);
    bigInt(123456789).neg().toNumber().should.equal(-123456789);
    bigInt(-123456789).neg().toNumber().should.equal(123456789);
  });
});

describe('#predicates', function() {
  it('isZero', function() {
    bigInt(0).isZero().should.equal(true);
    bigInt(1).isZero().should.equal(false);
  }),
  it('isNeg', function() {
    bigInt(0).isNeg().should.equal(false);
    bigInt(1).isNeg().should.equal(false);
    bigInt(-1).isNeg().should.equal(true);
  }),
  it('isPos', function() {
    bigInt(0).isPos().should.equal(false);
    bigInt(1).isPos().should.equal(true);
    bigInt(-1).isPos().should.equal(false);
  }),
  it('isEven', function() {
    bigInt(0).isEven().should.equal(true);
    bigInt(1).isEven().should.equal(false);
    bigInt(-1).isEven().should.equal(false);
    bigInt(2).isEven().should.equal(true);
    bigInt(-2).isEven().should.equal(true);
  }),
  it('isOdd', function() {
    bigInt(0).isOdd().should.equal(false);
    bigInt(1).isOdd().should.equal(true);
    bigInt(-1).isOdd().should.equal(true);
    bigInt(2).isOdd().should.equal(false);
    bigInt(-2).isOdd().should.equal(false);
  });
});
