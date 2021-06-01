/**
 * Chapter 2 - JavaScript issues [03-03]
 */
console.time("Time out");
var my_count;

(function(){
 // TODO: Test this code.
 "use strict";
 console.log("Log message");
 
 my_count = 42;
 
 if (my_count === "42") {
 console.log("my_count: is 42");
 }
 
 }());
console.timeEnd("Time out");