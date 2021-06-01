/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	Client class that could be used to demonstrate Active Object Pattern
 * */
public class Enqueue_ActiveObject {	
    /**
     * This method calls Active object pattern to update Account which is Race condition proof
     * */
    public static void addFund(String accountName, Decimal amount){
	 
		List<Fund_Account__c> lstfundAcc = [SELECT Available_Fund__c FROM Fund_Account__c WHERE NAME =: accountName LIMIT 1];
		
		//Enqueue request to be processed by Scheduler
        if(!lstfundAcc.isEmpty())
        { 
			Pending_Request__c recordForQueue = new Pending_Request__c(
				Record_Id__c = lstfundAcc[0].id ,
				Parameter1__c = String.valueOf(amount),
				Operation_Type__c = 'Add_Amount');
			insert recordForQueue ; 
        }        
    }
}