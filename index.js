var bigInt = (function() {
  var bi_base = 1000;

  function BigInt (value) {
    this.value = value;
  }

  BigInt.prototype.toString = function() {
    return this.value.toString();
  };

  BigInt.prototype.isNeg = function() {
    return this.value[0] < 0;
  };
  BigInt.prototype.isPos = function() {
    return this.value[0] > 0;
  };
  BigInt.prototype.isZero = function() {
    return this.value[0] == 0;
  };

  function parseInput(invalue) {
    var outvalue = [];
    if (invalue == 0) 
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
    return parseInput(a);
  };
  return fnReturn;
})();

if (typeof module !== "undefined") {
  module.exports = bigInt;
}
