public class myCustomController{

	public Account myAccount {get;set;}

	public PageReference save(){
		insert myAccount;
		return new apexPages.standardController(myAccount).view(); 
	}

	public void cancel(){
		//don’t return anything
	}

}