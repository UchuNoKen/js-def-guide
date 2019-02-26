/*
    Objects Exercises
    5/9/2018
*/

// What are objects...
//    An object is an unordered collections of properties, each with a name and value
//    We can say that objects map strings to values
//    Other names include: hash, hashtable, associative array, dictionary
//    Inherits from another object known as its prototype
//    Dynamic, properties can be added or deleted
//    Mutable
//    Manipulated by reference rather than value
//    Properties have a name and a value
//    Properties have attributes:
//          writable: if property can be set
//          enumerable: can be returned in a for/in loop
//          configurable: can be deleted or altered
//          value: value of the property
//      * configurable, enumerable, and writable set to true by default on properties
//        defined directly on an object
//    Object attributes:
//          prototype: reference to object from which properties are inherited
//          class: string that categorizes the type of an object
//          extensible: whether new properties may be added to the object
//    Native object:
//          object or class defined by ECMAScript: arrays, functions, dates, reg exp
//    Host object:
//          defined by host environment: HTMLElement, native objects
//    User-defined object:
//          object created by execution
//    Own property:
//          property defined directly on an object
//    Inherited property:
//          defined by an object's prototype


// Creating Objects...
    var empty = {}; // empty object
    var point = { x: 0, y: 0}; // object with two properties
    var point2 = {x: point.x, y:point.y+1};  // complex values
    var book = {
        title: 'JavaScript',
        'sub-title': 'The definitive guide',
        "for": "all audiences",
        author: {
            firstname: 'Bugs',
            surname: 'Bunny'
        }
    };

// Creating Objects with new...
//    * new creates and initializes a new object
//    * must be followed by a function invocation
//    * functions used this way are called constructors
var o = new Object();
var a = new Array();
var d = new Date();
var r = new RegExp();

// Prototypes...
//    every object has a second JS object associated with it, its prototype
//    the first object inherits from the prototype
//    object literals have Object.prototype
//    objects created with new use the value prototype of the constructor function
//    all built in constructor prototypes inherit from Object.prototype
//      ex. Array.prototype inherits from Object.prototype 

// Object.create()...
var o1 = Object.create({x:1, y:2});

// Passing null, create new protoless object that doesn't inherit anything
var o2 = Object.create(null);

// Create a new empty object
var o3 = Object.create(Object.prototype);

// ES5 way to create new object that inherits from a prototype
function inherit(p){
    if( p == null)
        throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== "object" && t !== "function")
        throw typeError();
    function f(){};
    f.prototype = p;
    return new f();
}

// Querying and Setting Properties...
//    To obtain the value of a property use the dot(.) or square brackets([])
//      left hand expression: an object
//      right hand (dot): a simple identifier that names the property
//      right hand (bracket): expression the evaluates to string the contains property name

var book = {
    title: 'JavaScript',
    'sub-title': 'The definitive guide',
    "for": "all audiences",
    author: {
        firstname: 'Bugs',
        surname: 'Bunny'
    }
};

var author = book.author;
var name = book.author.surname;
var title = book["sub-title"];

//  *create or set a property using the dot or square brackets on the left hand side

book.edition = 6;
book['main title'] = 'ECMAScript';

// Objects as Associative Arrays...
//    The following statements have the same value:
        book.property;
        book["property"];

// Inheritance...
//    The prototype chain continues up an object's prototype until the property is found

var o = {};
o.x = 1;
var p = inherit(o);
p.y = 2;
var q = inherit(p);
q.z = 3;
var s = q.toString();

//  *The fact that inheritance occures when querying properties but not when setting
//   them allows us to selectively override inherited properties

var unitcircle = {r: 1};
var c = inherit(unitcircle);
c.x = 1;
c.y = 1;
c.r = 2; // overrides inherited r property
unitcircle.r;

//  *If an object inherits a property that is an accessor with a setter method, the 
//  setter is called rather than creating a new property on the object. The method is
//  called on the object itself, not the prototype. So if the setter defines any properties
//  it will do so on the object and will not modify the prototype chain.

// Property Access Errors...
//   it is not an error to query a property that does not exist, will get undefined

book.subtitle;  // undefined: property does not exist

//   it is an error to query a property of an OBJECT that does not exist
var len = book.subtitle.length;  // TypeError: undefined does not have a length

//   alternative to get subtitle length or undefined
var len = book && book.subtitle && book.subtitle.length;

//   attempting to set a property on null or undefined causes a TypeError as well
//   some properties are read-only
//   some objects do not allow the addition of new properties

//  *it is not possible to set read-only properties
//  *it is not possible to hide an inherited read-only property
//  *no new properties can be set if object is not extensible

// Deleting properties...
//  the delete operator removes a property from an object
//  delete does not work on the value but the property itself
//  delete only deletes own properties
//  inherited properties must be deleted on prototype object
//  delete does not remove properties that have a configurable set to false
//  delete will remove properties of nonextensible objects

delete Object.prototype // can't delete
var x = 1;              // global variable
delete this.x;          // can't delete
function f() {}         // global function
delete this.f;          // can't delete

// Testing properties...
//    to check whether an object has a property with a given name:
//      in                 // operator
//      hasOwnProperty()   // method
//      propertyIsEnumerable()  // method

// in: property name on left(string), object on the right
//    returns true if own or inherited property

var o = { x: 1}
"x" in o;       // true, own
"y" in o;       // false, doesn't exist
"toString" in o;  // true, inherited

// hasOwnProperty(): tests own properties only
var o = {x: 1}
o.hasOwnProperty("x");      // true, own
o.hasOwnProperty("y");      // false, doesn't exist
o.hasOwnProperty("toString"); // false, inherited

// propertyIsEnumerable(): tests own property and enumerable, returns true only if so
var o = inherit({ y: 2 });
o.x = 1;
o.propertyIsEnumerable("x");  // true: own and enumerable
o.propertyIsEnumerable("y");  // false: inherited, not own
Object.prototype.propertyIsEnumerable("toString"); // false: not enumerable

// use !== in place of 'in' to query properties 
var o = {x: 1};
o.x !== undefined;  // true, own
o.y !== undefined;  // false, not own or inherited
o.toString !== undefined; // true, inherited

// unlike !==, 'in' can determine properties that exist but are set to undefined

var o = {x: undefined};
o.x !== undefined;  // false: exists and undefined
o.y !== undefined;  // false: doesn't exist
"x" in o;           // true: exists
"y" in o;           // false: doesn't exist
delete o.x;         // delete property x
"x" in o;           // false: doesn't exist anymore

// Enumerating properties...
//  use the for/in loop to obtain a list of all properties of an object
//  for/in runs the body of the loop once for each enumerable property(own or inherited)
//    of the specified object, assigning the property to the loop variable
//  built-in properties are not enumerable

var o = {x:1, y:2, z:3};
o.propertyIsEnumerable("toString");   // false: not enumerable
for(p in o){
    console.log(p);             // print x, y, z, but not toString
}

//  skip inherited properties
for(p in o){
    if(!o.hasOwnProperty(p))
        continue;
}

//  skip methods
for(p in o){
    if(typeof o[p] === "function")
        continue;
}

//  use for/in to copy enumerable props from p to o and return o
//  does not handle getters and setters
function extend(o, p){
    for(prop in p){                 // for all props in p
        o[prop] = p[prop];          // add property to o
    }
    return o;                       // return o   
}

//  use for/in to copy props from o to p and return o
//  do not copy o properties with same name as p properties
function merge(o, p){
    for(prop in p){                 // for all props in p
        if(o.hasOwnProperty[prop])  // except those already in o
            continue;
        o[prop] = p[prop];          // add the property to o
    }
    return o;                       // return o
}

// use for/in to remove properties from o if same name prop not in p
function restrict(o, p){
    for(prop in o){
        if(!(prop in p))        // for all props in o
            delete o[prop];     // delete if not in p
    }
    return o;
}

// use for/in for each prop in p, and delete prop with same name from o
function subtract(o, p){
    for(prop in p){             // for all props in p
        delete o[prop];         // delete from o
    }
    return o;
}

// return new object with properties of both o and p
// if o and p have same name props, o is used
function union(o, p){
    return extend(extend({}, o), p);
}

// return new object that holds only props of o that also appear in p
function intersection(o, p){
    return restrict(extend({}, o), p);
}

// return array of names of enumerable properties of o
function keys(o){
    if(typeof o !== 'object') throw TypeError();
    var result = [];                    // array to be returned
    for(var prop in o){                 // for all enumerable properties
        if(o.hasOwnProperty(prop))      // if it is an own property
            result.push(prop);          // add it to the array
    }
    return result;                      // return the array
}

//  *Object.keys() returns an array of the names of the enumerable own properties
//  *Object.getOwnPropertyNames() returns names of all own properties of an object

// Property Getters and Setters...
//  these properties are known as accessor properties
//  accessor properties do not have a writable attribute
//  property has getter and setter: it is a read/write property
//  property has getter: it is a read-only property
//  property has setter: it is a write-only property, read attempts return undefined

var o = {
    data_prop: value,   // regular data property

    get accessor_prop(){
        // function body here
    },

    set accessor_prop(value){
        // function body here
    }
};

var p = {
    x: 1.0,     // regular read-write data properties
    y: 1.0,

    get r(){            // read-write accessor with getter and setter
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    set r(newvalue){
      var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
      var ratio = newvalue / oldValue;
      this.x *= ratio;
      this.y *= ratio;  
    },

    get theta(){        // read-only property with getter only
        return Math.atan2(this.y, this.x);
    }
};

//  *accessor properties are inherited, just as data properties are
//   if p were used as a prototype for other objects, you can give the new
//   objects their own x and y properties and they'll inherit the r and theta props

var q = inherit(p);    // new object that inherits getters and setters
q.x = 0, q.y = 0;      // q's own data properties
console.log(q.r);      // use inherited properties
console.log(q.theta);

// sanity checking of property writes and returning different values on each prop

var serialnum = {   // generates strictly increasing serial numbers
    $n: 0,          // private data prop holds the next serial number
    
    get next(){             // return current value and increment it
        return this.$n++;
    },

    set next(n){          // set new value of n, only if larger than current
        if(n >= this.$n)
            this.$n = n;
        else
            throw "serial number can only be set to a larger value";
    }
};

// use getter method to implement property with 'magical' behavior

var random = {           // accessor props that return random numbers
    get octet(){
        return Math.floor(Math.random() * 256); // random num between 0 and 255
    },
    get unint16(){
        return Math.floor(Math.random() * 65536);
    },
    get int16(){
        return Math.floor(Math.random() * 65536) - 32768;
    }
};

// Property Attributes...
//  properties have attributes that specify whether they can be written, enumerated, and configured
//  no way to set these attributes in ES3
//  ES5 has API for querying and setting properties

//  data property attributes: value, writable, configurable, enumerable
//  accessor property attributes: get, set, enumerable, configurable

// ES5 methods for querying and setting attributes of a property use an object
//  called a descriptor method

// To obtain the property descriptor for a named property of an object, call 
//   Object.getOwnPropertyDescriptor()
//   *works only for own properties 

// returns {value: 1, writable: true, enumerable: true, configurable: true}
// for the x property of object literal
Object.getOwnPropertyDescriptor({x: 1}, "x");
Object.getOwnPropertyDescriptor(person, "age");

// returns { get: /*func*/, set:undefined, enumerable:true, configurable:true}
// for the octet property of the random object
Object.getOwnPropertyDescriptor(random, "octet");

// returns undefined for inherited properties and properties that don't exist.
Object.getOwnPropertyDescriptor({}, "x"); // undefined, no such prop
Object.getOwnPropertyDescriptor({}, "toString"); // undefined, inherited

// Object.defineProperty() : set or create new property with specified attributes
//  * pass object to modify, name of prop, and property descriptor object

var o = {};

Object.defineProperty(o, "x", {  // add nonenum data property x, with value of 1
    value : 1,
    writable: true,
    enumerable: false,
    configurable: true
});

        // check that property exists, but is nonenumerable
o.x;    // 1
Object.keys(o);

Object.defineProperty(o, "x", {writable: false}); // modify x so it is read-only

o.x = 2;        // try to change value of x to 2
o.x;            // attempt fails silently, or TypeError in strict mode

Object.defineProperty(o, "x", {value: 2});  // x still configurable, value can be changed like so
o.x     // 2

// change x from data property to an accessor property
Object.defineProperty(o, "x", {get: function(){return 0;}});
o.x     // 0

//   *when creating a new prop, omitted attributes are taken to be false or undefined
//   *alters existing own or creates new own property, will not alter inherited props

// Object.defineProperties()
//  use to create or modify more than one property at a time
//  Arguments:
//      object to create of modify
//      object that maps names of props to property descriptors for those props
var p = Object.defineProperties({}, {
    x: {value: 1, writable: true, enumerable: true, configurable: true},
    y: {value: 1, writable: true, enumerable: true, configurable: true},
    r: {
        get: function(){
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
          enumerable: true,
          configurable: true
    }
});

// Rules:
//    If object is not extensible, edit existing props, cannot add new properties
//    If property is not configurable, cannot change config and enum props
//    If accessor prop not configbl, can't change getter and setter, or change to data prop
//    If data prop non-configbl, can't change it to an accessor prop
//    Data prop non-configbl, can't change wrtbl attr from false to true, but can change from true to false
//    Data prop non-configbl and not wrtbl, cannot change its value
//    Can change value of prop that is configbl but nonwrtbl

// extend() function to copy all props of an object, incldg. all prop attributes

Object.defineProperty(Object.prototype, "extend", // define Object.prototype.extend
{
    writable: true,
    enumerable: false,      // Make nonenumerable
    configurable: true,
    value: function(o){     // Its value is this function
        var names = Object.getOwnPropertyNames(o);  // Get all own props, even nonenums
        // Loop through props
        for(var i = 0; i < names.length; i++){
            // Skip props already in this object
            if(names[i] in this)
                continue;
            // Get property description from o
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            // Use it to create property on this
            Object.defineProperty(this, names[i], desc);
        }
    }
});

// Legacy API for getters and setters...
__lookupGetter__()  // return the getter or setter method for a named property
__lookupSetter__()

__defineGetter__()  // define a getter or setter: prop name first, method second
__defineSetter__()

// The prototype attribute...
//   the prototype attribute specifies the object from which another object inherits
//      its properties

Object.getPrototypeOf();  // query the prototype of any object

isPrototypeOf();    // determine if one object is prototype of another

// determine if p is the prototype of o
var p = {x:1};
var o = Object.create(p);
p.isPrototypeOf(o)                  // true: o inherits from p
Object.prototype.isPrototypeOf(o);  // true: p inherits from Object.prototype

// * Mozilla supports the __proto__ property to directly query or set prototype

// The class attribute...
//   class attribute is a string that provides info about the type of the object
//   no way to set class attr, only an indirect way of querying it 
//   toString() will return a string of the form: [object class]

//   to obtain class of an obj, invoke toString() and extract the eighth through
//   the second-to-last characters of the returned string

// Return the class of any object you pass to it

function classof(o){
    if( o === null) return "Null";
    if( o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null) // => "Null"
classof(1) // => "Number"
classof("") // => "String"
classof(false) // => "Boolean"
classof({}) // => "Object"
classof([]) // => "Array"
classof(/./) // => "Regexp"
classof(new Date()) // => "Date"
classof(window) // => "Window" (a client-side host object)
function f() {}; // Define a custom constructor
classof(new f()); // => "Object"

// The extensible attribute...
//   specifies whether new properties can be added to an object or not
//   all built-in and user-defined objects are extensible unless converted

Object.isExtensible() // determines if object is extensible
Object.preventExtensions() // make object nonextensible

// * once obj is made nonextens, no way to make extensible again
// * if new props added to obj's proto, obj will inherit them

Object.seal()   // makes obj nonextens, and own props nonconfig
                // no props can be added, existing props can't be deleted or configured
                // existing writable props can stil be set
                // no way to unseal an object

Object.isSealed() // determine whether an object is sealed

Object.freeze() // makes nonextens, props nonconfig, own data props read only
                // if obj has setter method, these are not affected

Object.isFrozen() // determine if obj is frozen

// .seal() and .freeze() do not affect the prototype

// All return the object they are passed, so they can be nested

// Create sealed obj with frozen proto and nonenumerable property
var o = Object.seal(Object.create(Object.freeze({x:1}), 
    {y: {value: 2, writable: true}}));

// Serializing Objects...

// serialization is the process of converting an obj's state to a string from which
// it can later be restored

JSON.stringify() // serialize js objects
JSON.parse()     // restore js objects

o = {x: 1, y: {z: [false, null, '']}};  // test object
s = JSON.stringify(o);                  // stringify
p = JSON.parse(s);                      // p is a deep copy of o

// Obj, arr, str, funct, finite nums, true, false, null: can be serialized and restored
// NaN, Infinity, -Infinity: serialize to null
// Dates : serialize to ISO date strings, parse doesn't restore original object
// Func, RegExp, Error, and undefined: can't be serialized or restored
// stringify serialize only the enumbl own props of an obj
// if value cannot be stringified, prop is simply omitted
// both accept an optional second argument

// Object methods...
     toString() // takes no args, returns a string that represents value of an obj
     toLocaleString() // returns localized string representation of an obj
     toJSON()  // returns serialized value instead of original object
     valueOf() // converts an obj to a prim type other than a string





