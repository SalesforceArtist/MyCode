/**
* Chapter 2 - JavaScript issues [03-01]
 */
console.time("Time out");
var my_count;
 
(function(){
 	// TODO: Test this code.
 	console.log("Log message")
 	
 	var number1 = 40;
 	var number2 = 2;
 	my_count = number1 + number2;
 	
 	
 	if (my_count == "42") console.log("my_count: is 42");
 	
 	
}());
console.timeEnd("Time out");