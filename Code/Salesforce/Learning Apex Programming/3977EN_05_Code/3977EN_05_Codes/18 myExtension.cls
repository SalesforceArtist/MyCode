public class myExtension{

	Account myAccount {get;set;}

	//Constructor
	public myExtension(apexPages.standardController controller){
		myAccount = (Account)controller.getRecord();
	}

	public PageReference genericPhone(){
		if ( string.isBlank(myAccount.phone) ){
			myAccount.phone = '(818) 555-1212';
		}
		return null;
	}
}