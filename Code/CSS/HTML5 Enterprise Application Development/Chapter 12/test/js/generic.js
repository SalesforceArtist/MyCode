GenericTest = TestCase("GenericTest");

GenericTest.prototype.testOne = function() {
	var greeting = "Hello World!";
	assertEquals("Hello World!", greeting);
};

GenericTest.prototype.testTwo = function() {
	var greeting = "Hello World!";
	assertEquals("Good-bye.", greeting);
};