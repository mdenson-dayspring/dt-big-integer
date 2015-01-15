var bigInt = (function() {
  var bi_base = 0x4000000; // 2^26 so there is not overflow in multiplication in the JS 2^53 ints
  function _testBase() {
    bi_base = 1000;
  }

  function BigInt (value) {
    this.value = value;
  }

  BigInt.prototype.toString = function() {
    return this.value.toString();
  };
  // string representation used in tests
  BigInt.prototype.testString = function() {
    return this.value.toString();
  };

  // simple predicates
  BigInt.prototype.isNeg = function() {
    return this.sign() < 0;
  };
  BigInt.prototype.isPos = function() {
    return this.sign() > 0;
  };
  BigInt.prototype.isZero = function() {
    return this.sign() == 0;
  };
  BigInt.prototype.isEven = function() {
    return this.sign()==0 || ((this.value[1] % 2) == 0);
  };
  BigInt.prototype.isOdd = function() {
    return !this.isEven();
  };

  // comparison methods
  BigInt.prototype.sign = function() {
    if (this.value[0]<0)
      return -1;
    else if (this.value[0]>0)
      return 1;
    else
      return 0;
  };
  BigInt.prototype.compareTo = function(other) {
    if (!(other instanceof BigInt)) {
      other = parseInput(other);
    }
    var result = compareInts(this.value[0], other.value[0]);
    if (result == 0) {
      for (var i=Math.abs(this.value[0]); i>=1 && result==0; i--) {
	  result = compareInts(this.value[i], other.value[i]);
      }
    }
    return result;
  };
  function compareInts(thisv, otherv) {
    if (thisv == otherv)
      return 0;
    else if (thisv < otherv) 
      return -1;
    else if (thisv > otherv) 
      return 1;
  }
  BigInt.prototype.eq = function(other) {
    return this.compareTo(other) == 0;
  };
  BigInt.prototype.ne = function(other) {
    return this.compareTo(other) != 0;
  };
  BigInt.prototype.lt = function(other) {
    return this.compareTo(other) < 0;
  };
  BigInt.prototype.le = function(other) {
    return this.compareTo(other) <= 0;
  };
  BigInt.prototype.gt = function(other) {
    return this.compareTo(other) > 0;
  };
  BigInt.prototype.ge = function(other) {
    return this.compareTo(other) >= 0;
  };

  // simple math methods
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

  // arithmetic methods
  BigInt.prototype.add = function(other) {
    if (!(other instanceof BigInt)) {
      other = parseInput(other);
    }
    
    var thisv = this.value.slice(0);
    var otherv = other.value.slice(0);

    if (thisv[0] >= 0 && otherv[0] >= 0) {
      // Sum of two positive addends
      if (thisv[0] >= otherv[0])
        return new BigInt(sum(thisv, otherv));
      else
        return new BigInt(sum(otherv, thisv));

    } else if (thisv[0] <= 0 && otherv[0] <= 0) {
      // Sum of two negative addends
      thisv[0] = -1 * thisv[0];
      otherv[0] = -1 * otherv[0];
      if (thisv[0] >= otherv[0])
        var sumv = sum(thisv, otherv);
      else
        var sumv = sum(otherv, thisv);
      sumv[0] = -1 * sumv[0];
      return new BigInt(sumv);

    } else {
      // Sum of two addends with different signs
      var absthis = this.abs();
      var absother = other.abs();
      if (absother.eq(absthis))
	return new BigInt(parseInput(0));

      var thisNeg = this.isNeg();
      var thisGT = absthis.gt(absother);
      
      if (thisGT)
        var diffv = diff(absthis.value, absother.value);
      else
        var diffv = diff(absother.value, absthis.value);

      if ((thisNeg && thisGT) || (!thisNeg && !thisGT))
        diffv[0] = -1 * diffv[0];
      return new BigInt(diffv);
    }
  };
  BigInt.prototype.subtract = function(other) {
    if (!(other instanceof BigInt)) {
      other = parseInput(other);
    }
    return this.add(other.neg());
  };
  BigInt.prototype.multiply = function(other) {
    if (!(other instanceof BigInt)) {
      other = parseInput(other);
    }
    
    var productv = [];
    if (this.eq(0) || other.eq(0))
      productv = [0];
    else {
      var thisabs = this.abs();
      var otherabs = other.abs();

      if (thisabs.eq(1))
        productv = otherabs.value.slice(0);
      else if (otherabs.eq(1))
        productv = thisabs.value.slice(0);
      else {
        if (thisabs.value[0] > otherabs.value[0]) {
          var multiplier = otherabs.value.slice(0);
          var multiplicand = thisabs.value.slice(0);
	} else {
          var multiplier = thisabs.value.slice(0);
          var multiplicand = otherabs.value.slice(0);
	}
	productv.push(0);
        for (var i=1; i<=multiplier[0]; i++) {
          var tmp = [multiplicand[0] + (i-1)];
	  for (var p=1; p<i; p++)
	    tmp.push(0);
          for (var j=1; j<=multiplicand[0]; j++) {
            tmp.push(multiplier[i] * multiplicand[j]);
          }
          productv = sum(tmp, productv);
        }
      }
      if (this.sign() != other.sign())
	productv[0] = -1 * productv[0];
    }
    return new BigInt(productv);
  }

  /*
   * assumes that the addends are positive
   * and that addend1 has the same or more digits
   */
  function sum(addend1, addend2) {
    var sum = [];
    sum.push(addend1[0]);
    var carry = 0;
    for(var i=1; i<addend1[0]+1; i++) {
      var a1 = addend1[i];
      var a2 = addend2.length>i ? addend2[i] : 0;
      var s = a1 + a2 + carry;
      sum.push(s % bi_base);
      carry = Math.floor(s / bi_base);
    }
    if (carry>0) {
      sum[0]++;
      sum.push(carry);
    }
    return sum;
  }
  /*
   * assumes that the minuend is larger that the subtrahend
   */
  function diff(minuend, subtrahend) {
    var diff = [];
    diff.push(minuend[0]);
    var carry = 0;
    for(var i=1; i<minuend[0]+1; i++) {
      var m = minuend[i];
      var s = subtrahend.length>i ? subtrahend[i] : 0;
      var d = (m-carry) - s;
      if (d < 0) {
        diff.push(d + bi_base);
        carry = 1;
      } else {
        diff.push(d);
        carry = 0;
      }
    }    
    for(var i=diff.length-1; i>=1 && diff[i]==0; i--) 
      diff[0]--;
    return diff.slice(0, diff[0]+1);
  }

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

  // some synonms
  BigInt.prototype.sub = BigInt.prototype.subtract;
  BigInt.prototype.mul = BigInt.prototype.multiply;
  BigInt.prototype.times = BigInt.prototype.multiply;

  var fnReturn = function (a) {
    if (typeof a === 'undefined') return parseInput(0);
    return parseInput(a);
  };
  fnReturn._testBase = _testBase;
  return fnReturn;
})();

if (typeof module !== "undefined") {
  module.exports = bigInt;
}
