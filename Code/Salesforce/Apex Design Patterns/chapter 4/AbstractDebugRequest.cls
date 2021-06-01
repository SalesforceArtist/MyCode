/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This Class represents "Abtsract Request" object in Chain of Responsibility design Pattern.
 * */
public abstract class RequestHandler {
    
    /* constant for debug log */
    public static final integer LOG_LEVEL_SYSTEMDEBUG = 1;
    
    /* constant error and warn */
    public static final integer LOG_LEVEL_SAVE = 2;
    
    /* constant for Send Email */
    public static final integer LOG_LEVEL_EMAIL = 3;      
    
    /* Requested log level */
    protected integer handlerLogLevel ;
    
    /* Link to next Request Handler object */
    protected RequestHandler nextLogger;
    
    /* Set next Logger Request Handler class*/
    public void setNextLogger(RequestHandler logger){
        this.nextLogger = logger;
    }
    
    // "Chaining" of log request handlers
    public void logMessage(integer level, String message){
        if(handlerLogLevel <= level){
            write(message);
        }        
        /* "Chain" - Pass request to next Request Handler object*/
        if(nextLogger != null){
            nextLogger.logMessage(level,message);
        }
    }
	
    //This method needs to be implemented by all child log handlers
	abstract protected void write(String message);    
} 