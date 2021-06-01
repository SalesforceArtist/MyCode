/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This Class represents request handler to save debug messages in 
 * custom Object "Debug__c" in Chain of Responsibility design Pattern.
 * */

public class RequestHandler_Save extends RequestHandler {

    public RequestHandler_Save(integer log_level){
        this.handlerLogLevel = log_level ;
    }
    
    /**
     * This Debug Request Handler class Saves
     * Debug log record in custom object for
     * future error analysis.
     * */
    public override void write(String message){
        
        //Peform Database operation only if we have DML statement limit available
        if(Limits.getLimitDMLStatements() - Limits.getDMLStatements() > 1 )
        {
            //Perform Database operation only if we have atleast 1 row limit available for DML
            if(Limits.getLimitDMLRows() - Limits.getDMLRows() > 1){
                
                /**
                 * Save first 250 characters in "title" field
                 * as its indexed , so searching will be fast 
                 * */ 
                String title = message.length() > 250 ? message.left(249) : message ;
                Debug__c debugObj = new Debug__c(Title__c = title, Message__c = message);
                insert debugObj ;
            }else{
                System.debug(LoggingLevel.ERROR,'DML row limit exhausted');
            	System.debug(LoggingLevel.ERROR, message);
            } 
        }
        else{
            System.debug(LoggingLevel.ERROR,'DML statement limit exhausted');
            System.debug(LoggingLevel.ERROR, message);
        }      
        
    }
}