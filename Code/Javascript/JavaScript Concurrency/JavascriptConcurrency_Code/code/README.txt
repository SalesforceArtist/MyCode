To run the code examples found in this directory, you'll
need NodeJS installed. With Node installed, we need to
install the npm package dependencies. Simply run the
following from the command line (make sure you're in
this directory):

  npm install

This will install the listed dependencies in package.json.
Next, well need to install a couple global packages, because
they're used on the command line. Here's how you do that:

  npm install -g grunt-cli http-server

Now we can build the examples. Simply run grunt from the
command line, within this directory:

  grunt

This will build all the ES5 code that works in any browser. The
ES6 source the examples are written in work in some browsers,
but not others. Now you can start the web server, and visit
http://localhost:8080 (the port is a configurable http-server
option):

  http-server

All the examples, organized by chapter, are linked to from the
index page. The exception to this is the last three chapters.
Chapters 8 and 9 are Node-based, so you'll want to run these
from the command line. Chapter 10 is a sample application,
which works the same way - starting the server from the
command line.

The first two chapters don't have any code examples.

Enjoy!

-AB



Chapter 1 - No codes
