/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This Class represents Sysytem.debug() request handler in Chain of Responsibility design Pattern.
 * */
public class RequestHandler_SystemDebug extends RequestHandler{
    
    public RequestHandler_SystemDebug(integer log_level){
        this.handlerLogLevel = log_level ;
    }
    
    /**
     * This Debug Request Handler class only
     * log Debug messages in Log Console
     * */
    public override void write(String message){
        System.debug(message) ;      
    } 
}