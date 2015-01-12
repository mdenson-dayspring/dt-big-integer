var bigInt = (function() {
  var bi_base = 1000;

  function BigInt (value) {
    this.value = value;
  }

  BigInt.prototype.toString = function() {
    return this.value.toString();
  };

  // simple predicates
  BigInt.prototype.isNeg = function() {
    return this.value[0] < 0;
  };
  BigInt.prototype.isPos = function() {
    return this.value[0] > 0;
  };
  BigInt.prototype.isZero = function() {
    return this.value[0] == 0;
  };
  BigInt.prototype.isEven = function() {
    return this.isZero() || ((this.value[1] % 2) == 0);
  };
  BigInt.prototype.isOdd = function() {
    return !this.isEven();
  };

  BigInt.prototype.abs = function() {
    var value = this.value.slice(0);
    value[0] = Math.abs(value[0]);
    return new BigInt(value);
  };
  BigInt.prototype.neg = function() {
    var value = this.value.slice(0);
    value[0] = -1 * value[0];
    return new BigInt(value);
  };

  BigInt.prototype.toNumber = function() {
    if (this.value[0] == 0) 
      return 0;
    else {
      var out = 0;
      for (var i=Math.abs(this.value[0]); i>=1; i--) {
	  out = (out*bi_base) + this.value[i];
      }

      if (this.value[0] < 0)
        out = -1 * out;
      return out;
    }
  };

  function parseInput(invalue) {
    var outvalue = [];
    if (invalue instanceof BigInt)
      outvalue = invalue.value.slice(0);
    else if (invalue == 0) 
      outvalue.push(0);
    else {
      var negate = (invalue < 0);
      if (negate)
        invalue = -1 * invalue;

      while (invalue > 0) {
        if (invalue < bi_base) {
  	  outvalue.push(invalue);
	  invalue = 0;
        } else {
	  outvalue.push(invalue % bi_base);
	  invalue = Math.floor(invalue/bi_base);
        }
      }

      var count = outvalue.length;
      if (negate)
        count = -1 * count;
      outvalue.unshift(count);
    } 
    return new BigInt(outvalue);
  }

  var fnReturn = function (a) {
    if (typeof a === 'undefined') return parseInput(0);
    return parseInput(a);
  };
  return fnReturn;
})();

if (typeof module !== "undefined") {
  module.exports = bigInt;
}
