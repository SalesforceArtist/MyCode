public with sharing class myCustomController {

	//Here’s our property
	public Account myAccount {get;set;}

	//Here’s our constructor
	public myCustomController(){
		myAccount = new Account();
	}

}