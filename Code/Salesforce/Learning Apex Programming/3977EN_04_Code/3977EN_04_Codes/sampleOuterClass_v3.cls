public with sharing class sampleOuterClass {

	public String myString;
	public Integer myInteger;

	public sampleOuterClass(){
		this(null,null);
	}
	public sampleOuterClass(String inputString){
		this(inputString,null);
	}
	public sampleOuterClass(Integer inputInteger){
		this(null,inputInteger);
	}
	public sampleOuterClass(String inputString, Integer inputInteger){
		//logic goes here
		myString = inputString;
		if ( string.isBlank(myString) ){
			myString = 'hello';
		}
		myInteger = inputInteger;
		if ( myInteger == null ){
			myInteger = 1;
		}
		//more logic goes here
	}

}