/** 
  * Chapter 05 - 01
  */

var pi = 3.14159265359,
another_pi = 3.14159265359,
a_string_of_pis = "3.14159265359";

console.time("Check PI");
/** Anonymous Function to evaluate our pi's */
(function(){
    var test = pi == another_pi;
}());
console.timeEnd("Check PI");