/*
 * Chapter 6 - 07
 *
 */

function authorName(author) {
    "use strict";
    return author;
    
}
function helloInfo() {
    console.info("Hello, my name is " + authorName('Chad Adams') + ".");
}
console.time("Create Logged Messages:");

console.log(authorName('Chad Adams'));
helloInfo();

console.timeEnd("Create Logged Messages:");