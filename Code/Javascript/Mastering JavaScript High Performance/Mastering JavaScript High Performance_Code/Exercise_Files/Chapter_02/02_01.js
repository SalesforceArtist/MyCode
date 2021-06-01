/**
 * Chapter 2 - JavaScript issues [01]
 */

console.time("100 objects in For loop");

function NewObj(param) {
    this.value = param;
}

for (var i = 0; i <= 100; i++) {
    /** Create new object 100 times */
    var Obj = new NewObj([i]);
}

console.timeEnd("100 objects in For loop");