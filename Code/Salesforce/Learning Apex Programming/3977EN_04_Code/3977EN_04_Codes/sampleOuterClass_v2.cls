public with sharing class sampleOuterClass {

	public String myString;
	public Integer myInteger;

	public sampleOuterClass(){
		myString = 'hello';
		myInteger = 1;
	}
	public sampleOuterClass(String inputString){
		myString = inputString;
		myInteger = 1;
	}
	public sampleOuterClass(Integer inputInteger){
		myString = 'hello';
		myInteger = inputInteger;
	}
}