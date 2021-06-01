function greeter(person) {
    return "Hello, " + person;
}

function circumference(radius) {
    var pi = 3.141592654;
    return 2 * pi * radius;
}

var user = "Ray";

console.log(greeter(user));
console.log("You need " + circumference(2) + " meters of fence.");
