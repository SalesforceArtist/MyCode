/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This class contains methos to return chan of available Loggers
 * */
public class Loggers {
	
    /**
     * Below method returns Chained Loggers
     * */
    public static RequestHandler getChainOfLoggers(){
        
        RequestHandler debugLogger = new RequestHandler_SystemDebug(RequestHandler.LOG_LEVEL_SYSTEMDEBUG);
        RequestHandler databaseLogger = new RequestHandler_Save(RequestHandler.LOG_LEVEL_SAVE);
        RequestHandler emailLogger = new RequestHandler_SendEmail(RequestHandler.LOG_LEVEL_EMAIL);
        
        //Create Chain of Loggers
        //DebugLogger -> Database Save -> Send Email
        debugLogger.setNextLogger(databaseLogger);
        databaseLogger.setNextLogger(emailLogger);
        
        //return logger which starts chain
        return debugLogger;
    }
}