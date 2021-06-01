/**
 * Chapter 3 - ExampleScript.js
 * Understanding JavaScript build systems
 */
 
 
/**
  * Toddler Class
  */
console.time('test time');
function Toddler(FirstName) {
	this.ToddlerName = FirstName;
	this.says = this.ToddlerName + " says, ";
}
 
/** Function to log a Toddler crying */
Toddler.prototype.cry = function () {
    console.log(this.says + "WAHHH!")
}
 
/** Function to log a Toddler crying */
Toddler.prototype.giggle = function () {
    console.log(this.says + "Hehehe!")
}

var Leo = new Toddler('Leo');

Leo.cry();
Leo.giggle();

console.timeEnd('test time');