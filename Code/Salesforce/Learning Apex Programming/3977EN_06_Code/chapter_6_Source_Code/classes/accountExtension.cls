public with sharing class accountExtension {

	//Holder variable for our Account
	public Account thisAccount {get;set;}

	//Boolean true if this is a Guest User, false otherwise
	//Boolean true if this is a Guest User, false otherwise
	public boolean isGuestUser {
		get{ //Defines the return value of the Getter
			//Retrieve our Account from the standard controller
			return 'Guest'.equalsIgnoreCase( UserInfo.getUserType() );		
		}
	}


	//Constructor which extends the Account Standard Controller
	public accountExtension(Apexpages.StandardController sCon) {
		thisAccount = (Account)scon.getRecord();
	}

	//Our custom save method
	public PageReference customSave(){
		upsert thisAccount; //Upsert Account
		//Display a confirmation message, styled like Force.com
		ApexPages.addMessage(
			new ApexPages.message(
				ApexPages.Severity.Confirm,
				'Account Saved Successfully'));
		return ApexPages.currentPage();
	}
}