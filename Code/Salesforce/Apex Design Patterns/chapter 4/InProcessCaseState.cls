/**
 * In-Process case state handler
 */
public class InProcessCaseState implements CaseState{
    public void close(Case customerCase){
        system.debug('** close in-process case');
    }
    
    public void calculateTimeSpent(Case customerCase){
    	//calculate time from date/time case status was set to "Open"
    	system.debug('** calculate time spent for in-process case');
    }
    
    public void validate(Case customerCase){
        system.debug('** validate in-process case');
    }
}