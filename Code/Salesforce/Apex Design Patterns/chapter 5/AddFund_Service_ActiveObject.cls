/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	This is service Class which either reads records from custom object
 * 				:	"Pending Request" if List is empty or directly process List
 * */

 /**
 *	This service class will be invoked from Scheduler to perform operation on Active Object
 *	to add fund.
 *
 */
 public class AddFund_Service_ActiveObject { 
       
	//This method can be called from scheduler 
    public void execute() {
		
		//List of Active objects
		List<Fund_Account__c> lstFundAccount = new List<Fund_Account__c>();
		
		//Map to store QueueId for FundingAccount ID.
		//It will be used to know whether record is processed or not 
		Map<Id,Id> mpFundAccountId_PendingAccountId = new Map<Id,Id>();
	
         //Read Queue for "Add_Amount" type of operation
		 List<Pending_Request__c> lstPendingRequests =  [SELECT Id,
			Record_Id__c,Parameter1__c FROM Pending_Request__c 
			WHERE Is_Processed__c = false  AND Operation_Type__c =: 
			'Add_Amount' LIMIT 2000];
		 
		 //Create collection of Id to query Fund Account from queue
		 Map<Id,String> mpAccountParams = new Map<Id,String>();
		 
		 for(Pending_Request__c pr :lstPendingRequests){
			 //Parameter1__c contains amount to be added
			 mpAccountParams.put(pr.Record_Id__c, pr.Parameter1__c); 
			 mpFundAccountId_PendingAccountId.put( pr.Record_Id__c, pr.Id);
		 }
		 
		 //Get lock on records to avoid Race condition using "For Update"
		 List<Fund_Account__c> lstAcnt = [SELECT ID , Available_Fund__c 
			FROM Fund_Account__c WHERE ID IN :mpAccountParams.keySet() 
			FOR Update];
		 
		 //Ask Active object to take care of processing
		 for(Fund_Account__c fund : lstAcnt){
			 FundingAccount_ActiveObject activeObject = 
				new FundingAccount_ActiveObject(
					fund,Decimal.valueOf(mpAccountParams.get(fund.Id)));
					
			activeObject.performAddOperation(); 
			
			//Active object performed operation but not commited yet in SFDC
			//This approach helps avoiding Governor limit error
			lstFundAccount.add(fund);  
		 } 
		 //commit to database and process result
         if(!lstFundAccount.isEmpty()) {
             List<Database.SaveResult> updateResults = Database.update(lstFundAccount , false);
             processResult(updateResults, mpFundAccountId_PendingAccountId);
         }
    }
     
    
    /**
     * This method takes Database.SaveResult list and prepares success and error messages
     * */
    private void processResult(List<Database.SaveResult> updateResults, Map<Id,Id> mpFundAccountId_PendingAccountId){ 
	
        List<Pending_Request__c> lstPendingRequests = new List<Pending_Request__c>();
		
        for(Integer i=0 ; i<updateResults.size() ; i++){
			Pending_Request__c res = new Pending_Request__c(
							Record_Id__c = updateResults.get(i).getId(), 
                            Is_Processed__c = true,
                            Status__c = 'Success' 
                            ) ;
							
            if (!updateResults.get(i).isSuccess()){ 
                  res.Status__c = 'Error';                
            } 
			//Get Id of record from Queue so that it can be updated
			if(mpFundAccountId_PendingAccountId.containsKey(res.Record_Id__c)) {
				res.Id = mpFundAccountId_PendingAccountId.get(res.Record_Id__c);
			}
			//create list of result to be updated
			lstPendingRequests.add(res); 
        }
		//Perform DML operation to update final status of records in Queue
        saveResultToPendingObject(lstPendingRequests);
    }
	
	/**
     * upsert results to "Pending Requests" object with success or error status
     * */
    private void saveResultToPendingObject(List<Pending_Request__c> lstPendingRequests){
        if(!lstPendingRequests.isEmpty())
        {
            Database.upsert(lstPendingRequests,  false );
        } 
    }
}