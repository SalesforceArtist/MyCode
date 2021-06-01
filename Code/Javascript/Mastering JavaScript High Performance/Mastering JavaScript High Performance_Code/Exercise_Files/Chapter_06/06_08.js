/*
 * Chapter 6 - 08
 *
 */

function AuthorName(author) {
    "use strict";
    this.authorFullName = author;
}
AuthorName.prototype.init = function() {
    return this.authorFullName;
}
AuthorName.prototype.helloInfo = function() {
    console.info("Hello, my name is " + this.authorFullName + ".");
}
console.time("Create Logged Messages:");

var author1 = new AuthorName('Chad Adams');
console.log(author1.init());
author1.helloInfo();

console.timeEnd("Create Logged Messages:");