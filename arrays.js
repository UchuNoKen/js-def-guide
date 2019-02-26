/*
    Arrays Exercises
    5/11/2018
*/


// Arrays...
//  an ordered collection of values called elements
//  each element has a numbered position know as its index
//  elements may be of any type
//  zero-based, 32-bit indexes
//  max array size of 4,294,967,295 elements
//  arrays are dynamic, grow and shrink as needed
//  may be sparse, non-contiguous indexes and gaps allowed
//  every array has a length property, number of elements in the array
//  in sparse arrays, length is longer than the index of all elements
//  arrays inherit properties from Array.prototype
//  strings behave like arrays of characters

// Creating Arrays...

// Literals
var empty = [];
var primes = [2, 3, 5, 7, 11];
var misc = [1.1, true, "a",];  // 3 elements + trailing comma

//    values may be constants or arbitrary expressions
var base = 1024;
var table = [base, base+1, base+2, base+3];

//    can contain obj literals or other array literals
var b = [[1, {x:1, y: 2}], [2, {x:3, y:4}]];

//    omitted values are given value of undefined
var count = [1,,3];
var undefs = [,,];

//    array literal syntax allows optional trailing commas
var test = [,,];    // has two elements due to trailing comma

// Array()
var a = new Array();   // called with no arguments

var a = new Array(10); // single arg which specifies a length
                       // no values store, indexes not defined

// specify two or more elements, or non-numeric element
var a = new Array(1, 2, 3, 4, 5, "testing");

// Reading and Writing array elements...
var a = ['world'];   // one-element array
var value = a[0];    // read element 0
a[1] = 3.14;         // write element 1
i = 2;
a[i] = 3;           // write element 2 since i === 2
a[i + 1] = 'hello';  // write element 3
a[a[i]] = a[0];    // read elements 0 and 2, write element 3

//    using brackets with objects too
var o = {};
o[1] = 'one';

//  * when you use property names that are non-negative integers less than 2^32,
//    the array automatically maintains the value of the length property for you

//  * all indexes are property names, but only property names that are integers
//      between 0 and 2^32-1 are indexes

//  * you can index an array with numbers that are negative or non-integers, which
//      convert to a string that is used as the prop name, and treated like an object prop
a[-1.23] = true;  // creates string that is a property named "-1.23"
a["1000"] = 0;    // the 1001st element of the array a
a[1.000];         // array index 1, same as a[1]

//  * when you try to query non-existent props of an array, no error, just undefined
a = [true, false];   // elements at 0 and 1
a[2];                // undefined: no element at this index
a[-1];               // undefined: no property with this name

//  * arrays can inherit elements from their prototype
//  * arrays can have array elements defined by getter and setter methods

// Sparse Arrays...

//  * sparse arrays do not have contiguous indexes starting at 1



















