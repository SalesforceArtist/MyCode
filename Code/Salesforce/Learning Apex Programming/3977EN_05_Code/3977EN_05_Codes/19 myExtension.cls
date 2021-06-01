public class myExtension{

	sObject myRecord {get;set;}

	//Constructor
	public myExtension(apexPages.standardController controller){
		myRecord = controller.getRecord();
	}

	public void genericPhone(){
		//These 3 sObjects have a field named ‘phone’
		if ( 
			myRecord instanceof Account ||
			myRecord instanceof Contact || 
			myRecord instanceof Lead 
		){
			if ( String.isBlank((String)myRecord.get('phone')) ){
				myRecord.put('phone','(818) 555-1212');
			}
		}
	}
}