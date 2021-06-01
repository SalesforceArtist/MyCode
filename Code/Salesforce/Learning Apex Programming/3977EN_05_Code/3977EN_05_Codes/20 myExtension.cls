public class myExtension{

	sObject myRecord {get;set;}

	//Constructor to Extend a Standard Controller
	public myExtension(apexPages.standardController controller){
		myRecord = controller.getRecord();
	}

	//Constructor to Extend a Custom Controller that has a 
	//Class name of myCustomController
	public myExtension(myCustomController controller){
		myRecord = controller.myAccount;
	}

	public void genericPhone(){
		//These 3 sObjects have a field named ‘phone’
		if ( 
			myRecord instanceof Account ||
			myRecord instanceof Contact || 
			myRecord instanceof Lead 
		){
			if ( string.isBlank((String)myRecord.get('phone')) ){
				myRecord.put('phone','(818) 555-1212');
			}
		}
	}
}