var bi_base = 1000;

var BigInt = function(value) {
  this.value = [];
  if (value == 0) 
    this.value.push(0);
  else {
    var negate = (value < 0);
    if (negate)
      value = -1 * value;

    while (value > 0) {
      if (value < bi_base) {
	this.value.push(value);
	value = 0;
      } else {
	this.value.push(value % bi_base);
	value = Math.floor(value/bi_base);
      }
    }

    var count = this.value.length;
    if (negate)
      count = -1 * count;
    this.value.unshift(count);
  }
}

BigInt.prototype.toString = function() {
  return this.value.toString();
}

BigInt.prototype.isNeg = function() {
  return this.value[0] < 0;
}
BigInt.prototype.isPos = function() {
  return this.value[0] > 0;
}
BigInt.prototype.isZero = function() {
  return this.value[0] == 0;
}

module.exports = BigInt;
