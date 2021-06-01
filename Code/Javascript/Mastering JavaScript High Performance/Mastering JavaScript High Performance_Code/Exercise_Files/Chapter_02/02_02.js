/**
 * Chapter 2 - JavaScript issues [02]
 */

console.time("10 objects in For loop");

function NewObj(param) {
    this.value = param;
}

for (var i = 0; i <= 10; i++) {
    /** Create new object 10 times */
    var Obj = new NewObj([i]);
}

console.timeEnd("10 objects in For loop");