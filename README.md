Big Integer library module
==========================

A library providing a arbitrary length integer implementation for Node and browser javascript coding.  
This library was put together as an implementation of Programming Praxis "Big Number" exercises in 2011.

## Installation

    npm install dt-big-integer --save

## Usage

    var bigInt = require('dt-big-integer');
    
    var zero = bigInt();
    var one = bigInt(1);
    var bigger = bitInt(123456789);

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 First Release (Completed Programming Praxis excercise "Big Numbers: Getting Started": May 24, 2011)

