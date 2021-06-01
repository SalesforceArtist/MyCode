/**
 * Apex Design Patterns - 	Chapter 4
 * Pattern				-	Command Design Pattern
 * Description			-	Batch process within AppExchange app
 * */
public class PaymentReconciliationBatch 
	implements Database.Batchable<Sobject>, Database.Stateful{
    
    IRequestHandler passhandler;
    IRequestHandler failhandler;
    
    //constructor
    public PaymentReconciliationBatch(IRequestHandler passhandler, 
                                       IRequestHandler failhandler){
        this.passhandler = passhandler;
        this.failhandler = failhandler;
    }
    
    public Database.QueryLocator start(
		Database.BatchableContext jobId){
    	
		return Database.getQueryLocator(
			'select id from Account limit 100');    
    }
    
    public Void execute(Database.BatchableContext jobId, 
                        List<sObject> recordList){
		//data processing logic
    }
    
    public Void finish(Database.BatchableContext jobId){
        try{
			//invoke success command
        	passhandler.execute();
    	}
        catch(Exception ex){
			//invoke error command	
            failhandler.execute();
        }
    }
}