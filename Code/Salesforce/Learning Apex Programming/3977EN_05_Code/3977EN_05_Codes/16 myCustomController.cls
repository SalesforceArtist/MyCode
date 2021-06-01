public class myCustomController{

	//Our property
	public Account myAccount {get;set;}

	//Constructor
	public myCustomController(){
		myAccount = new Account();
		if ( apexPages.currentPage().getParameters().containsKey('id') ){
			try {
				Id accountId = apexPages.currentPage().getParameters().get('id');
				myAccount = [
					select Fax, Id, Industry, Name, Phone, Type, Website 
					from Account
					where Id =:accountId
					limit 1
				];
			} catch (exception e) { }
		}
	}

	//Save action
	public PageReference save(){
		upsert myAccount;
		//Redirect them to view the new record
		return new apexPages.standardController(myAccount).view(); 
	}

	//Cancel action
	public PageReference cancel(){
		//Send them back to the Accounts tab
		return new PageReference('/001/o');
	}

}