/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This Class represents request handler to Send Email to Salesforce
 * User specified in Custom label named "DeveloperUserId"
 * */
public class RequestHandler_SendEmail extends RequestHandler {
     
    public RequestHandler_SendEmail(integer log_level){
        this.handlerLogLevel = log_level ;
    }
    
    /**
     * Send Email to Salesforce User.
     * We would not be sending email to external users to avoid governor limits
     * */
    
    public override void write(String message){
        try
        {
            List<Messaging.SingleEmailMessage> lstEmailstoSend = new List<Messaging.SingleEmailMessage>();
            
            //read usernames from Custom label which has comma seperated users name
            for(User u : [SELECT ID FROM User WHERE UserName IN : System.Label.Developer_User_Name.split(',')]){ 
                Messaging.SingleEmailMessage emailMessage =  new Messaging.SingleEmailMessage(); 
            	emailMessage.setSubject('Debug Message from Salesforce');
                emailMessage.setTargetObjectId(u.Id);
                emailMessage.setPlainTextBody(message); 
                emailMessage.setSaveAsActivity(false);
                lstEmailstoSend.add(emailMessage); 
            } 
            
            if(!lstEmailstoSend.isEmpty())
            	Messaging.sendEmail(lstEmailstoSend); 
            
        }catch(Exception e){
            System.debug(LoggingLevel.ERROR,'Some error occurred while sending email for Logging purpose');
            System.debug(LoggingLevel.ERROR, e.getMessage());
        }
    }
}