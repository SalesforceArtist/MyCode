/*
 * Chapter 6 - 06
 *
 */

function AuthorName(author) {
    "use strict";
    this.init = function() {
        return author;
    }
    this.helloInfo = function() {
        console.info("Hello, my name is " + author + ".");
    }
}
console.time("Create Logged Messages:");

var author1 = new AuthorName('Chad Adams');
console.log(author1.init());
author1.helloInfo();

console.timeEnd("Create Logged Messages:");