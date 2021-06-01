public with sharing class sampleOuterClass {

	static Map<String, Integer> contactsByState = 
		new Map<String,Integer>();
	static Map<String, Integer> accountsByState = 
		new Map<String,Integer>();

	public static void calculateMetrics(){
		for ( Account a : [
			Select Id, BillingState 
			from Account 
			where BillingState != null 
			limit 5000
		]){
			Integer thisState = 0;
			if ( accountsByState.containsKey(a.BillingState) ){
				thisState = accountsByState.get(a.BillingState);
			}
			accountsByState.put(a.BillingState, thisState+1);
		}
		for ( Contact c : [
			Select Id, MailingState 
			from Contact 
			where MailingState != null 
			limit 5000
		]){
			Integer thisState = 0;
			if (contactsByState.containsKey(c.MailingState) ){
				thisState = contactsByState.get(c.MailingState);
			}
			contactsByState.put(c.MailingState, thisState+1);
		}
	}
}