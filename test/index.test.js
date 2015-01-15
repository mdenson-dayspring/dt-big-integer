var should = require('chai').should(),
    bigInt = require('../index');
bigInt._testBase();

describe('#factory bigInt()', function() {
  it('null input', function() {
    bigInt().testString().should.equal('0');
  }),
  it('bigInt input', function() {
    bigInt(bigInt(1)).testString().should.equal('1,1');
  }),
  it('javascript numbers input', function() {
    bigInt(0).testString().should.equal('0');
    bigInt(1).testString().should.equal('1,1');
    bigInt(-1).testString().should.equal('-1,1');
    bigInt(100).testString().should.equal('1,100');
    bigInt(-100).testString().should.equal('-1,100');
    bigInt(999).testString().should.equal('1,999');
    bigInt(-999).testString().should.equal('-1,999');
    bigInt(1000).testString().should.equal('2,0,1');
    bigInt(-1000).testString().should.equal('-2,0,1');
    bigInt(123456789).testString().should.equal('3,789,456,123');
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
  }),
  it('add - positive addends', function() {
    bigInt(1234).add(1834).toNumber().should.equal(3068);
    bigInt(234).add(1834).toNumber().should.equal(2068);
    bigInt(1234).add(834).toNumber().should.equal(2068);
    bigInt(234).add(834).toNumber().should.equal(1068);
    bigInt(1234).add(0).toNumber().should.equal(1234);
    bigInt(0).add(999).toNumber().should.equal(999);
  }),
  it('add - negative addends', function() {
    bigInt(-1234).add(-1834).toNumber().should.equal(-3068);
    bigInt(-234).add(-1834).toNumber().should.equal(-2068);
    bigInt(-1234).add(-834).toNumber().should.equal(-2068);
    bigInt(-234).add(-834).toNumber().should.equal(-1068);
    bigInt(-1234).add(0).toNumber().should.equal(-1234);
    bigInt(0).add(-999).toNumber().should.equal(-999);
  }),
  it('add - mixed sign addends', function() {
    bigInt(-1).add(1).toNumber().should.equal(0);

    bigInt(-1).add(1834).toNumber().should.equal(1833);
    bigInt(-234).add(1834).toNumber().should.equal(1600);
    bigInt(-999).add(2000).toNumber().should.equal(1001);

    bigInt(1).add(-1834).toNumber().should.equal(-1833);
    bigInt(234).add(-1834).toNumber().should.equal(-1600);
    bigInt(999).add(-2000).toNumber().should.equal(-1001);

    bigInt(-999999).add(1000000).testString().should.equal("1,1");
    bigInt(999).add(-1000).testString().should.equal("-1,1");
  }),
  it('subtract', function() {
    bigInt(1).subtract(1).toNumber().should.equal(0);

    bigInt(1834).subtract(1).toNumber().should.equal(1833);
    bigInt(1834).subtract(234).toNumber().should.equal(1600);
    bigInt(2000).subtract(999).toNumber().should.equal(1001);

    bigInt(1).subtract(1834).toNumber().should.equal(-1833);
    bigInt(234).subtract(1834).toNumber().should.equal(-1600);
    bigInt(999).subtract(2000).toNumber().should.equal(-1001);

    bigInt(1000000).subtract(999999).testString().should.equal("1,1");
    bigInt(999).subtract(1000).testString().should.equal("-1,1");

    // check that synonym exists
    bigInt(1).sub(1).toNumber().should.equal(0);
  }),
  it('multiply', function() {
    bigInt(0).multiply(1000).toNumber().should.equal(0);
    bigInt(1000).multiply(0).toNumber().should.equal(0);
    bigInt(1).multiply(1).toNumber().should.equal(1);
    bigInt(-1).multiply(-1).toNumber().should.equal(1);
    bigInt(-1).multiply(1).toNumber().should.equal(-1);
    bigInt(1).multiply(-1).toNumber().should.equal(-1);
    bigInt(400).multiply(2).testString().should.equal("1,800");
    bigInt(500).multiply(2).testString().should.equal("2,0,1");
    bigInt(999).multiply(999).testString().should.equal("2,1,998");
    bigInt(999999).multiply(999999).testString().should.equal("4,1,0,998,999");

    // check that synonyms exists
    bigInt(0).mul(1000).toNumber().should.equal(0);
    bigInt(0).times(1000).toNumber().should.equal(0);
  });
});

describe('#comparison', function() {
  it('compareTo(bigInt)', function() {
    bigInt(0).compareTo(bigInt(0)).should.equal(0);
    bigInt(1).compareTo(bigInt(0)).should.equal(1);
    bigInt(0).compareTo(bigInt(1)).should.equal(-1);

    bigInt(1).compareTo(bigInt(1)).should.equal(0);
    bigInt(2).compareTo(bigInt(1)).should.equal(1);
    bigInt(1).compareTo(bigInt(2)).should.equal(-1);

    bigInt(1000).compareTo(bigInt(1000)).should.equal(0);
    bigInt(1000).compareTo(bigInt(1)).should.equal(1);
    bigInt(1).compareTo(bigInt(1000)).should.equal(-1);

    bigInt(-1000).compareTo(bigInt(-1000)).should.equal(0);
    bigInt(-1001).compareTo(bigInt(-1000)).should.equal(1);
    bigInt(-1000).compareTo(bigInt(-1001)).should.equal(-1);

    bigInt(-1).compareTo(bigInt(1)).should.equal(-1);
    bigInt(1).compareTo(bigInt(-1)).should.equal(1);

    bigInt(123456789).compareTo(bigInt(987654321)).should.equal(-1);
    bigInt(121111111).compareTo(bigInt(111111111)).should.equal(1);
    bigInt(111121111).compareTo(bigInt(111111111)).should.equal(1);
    bigInt(111111121).compareTo(bigInt(111111111)).should.equal(1);
    bigInt(111111111).compareTo(bigInt(121111111)).should.equal(-1);
    bigInt(111111111).compareTo(bigInt(111121111)).should.equal(-1);
    bigInt(111111111).compareTo(bigInt(111111121)).should.equal(-1);
  }),
  it('compareTo(int)', function() {
    bigInt(0).compareTo(0).should.equal(0);
    bigInt(1).compareTo(0).should.equal(1);
    bigInt(0).compareTo(1).should.equal(-1);

    bigInt(1).compareTo(1).should.equal(0);
    bigInt(2).compareTo(1).should.equal(1);
    bigInt(1).compareTo(2).should.equal(-1);

    bigInt(1000).compareTo(1000).should.equal(0);
    bigInt(1000).compareTo(1).should.equal(1);
    bigInt(1).compareTo(1000).should.equal(-1);

    bigInt(-1000).compareTo(-1000).should.equal(0);
    bigInt(-1001).compareTo(-1000).should.equal(1);
    bigInt(-1000).compareTo(-1001).should.equal(-1);

    bigInt(-1).compareTo(1).should.equal(-1);
    bigInt(1).compareTo(-1).should.equal(1);

    bigInt(123456789).compareTo(987654321).should.equal(-1);
    bigInt(121111111).compareTo(111111111).should.equal(1);
    bigInt(111121111).compareTo(111111111).should.equal(1);
    bigInt(111111121).compareTo(111111111).should.equal(1);
    bigInt(111111111).compareTo(121111111).should.equal(-1);
    bigInt(111111111).compareTo(111121111).should.equal(-1);
    bigInt(111111111).compareTo(111111121).should.equal(-1);
  }),
  it('eq and ne', function() {
    bigInt(0).eq(0).should.equal(true);
    bigInt(1).eq(0).should.equal(false);
    bigInt(0).eq(1).should.equal(false);

    bigInt(0).ne(0).should.equal(false);
    bigInt(1).ne(0).should.equal(true);
    bigInt(0).ne(1).should.equal(true);
  }),
  it('lt and le', function() {
    bigInt(0).lt(0).should.equal(false);
    bigInt(1).lt(0).should.equal(false);
    bigInt(0).lt(1).should.equal(true);

    bigInt(0).le(0).should.equal(true);
    bigInt(1).le(0).should.equal(false);
    bigInt(0).le(1).should.equal(true);
  }),
  it('gt and ge', function() {
    bigInt(0).gt(0).should.equal(false);
    bigInt(1).gt(0).should.equal(true);
    bigInt(0).gt(1).should.equal(false);

    bigInt(0).ge(0).should.equal(true);
    bigInt(1).ge(0).should.equal(true);
    bigInt(0).ge(1).should.equal(false);
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
