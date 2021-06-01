function greeter(person: string): string {
  return "Hello, " + person;
}

function circumference(radius: number) : number {
  var pi: number = 3.141592654;
  return 2 * pi * radius;
}

var user: string = "Ray";

console.log(greeter(user));
console.log("You need " + 
  circumference(2) + 
  " meters of fence for your dog.");