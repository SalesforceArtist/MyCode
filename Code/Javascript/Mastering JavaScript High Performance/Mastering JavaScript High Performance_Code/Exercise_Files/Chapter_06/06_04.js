/*
 * Chapter 6 - 04
 *
 */

function AuthorName(author) {
    "use strict";
    this.init = function() {
        return author;
    }
}

var author1 = new AuthorName('Chad Adams');

console.log(author1.init());