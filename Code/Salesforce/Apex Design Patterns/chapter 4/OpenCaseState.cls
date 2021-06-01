/**
 * Open case state handler
 */
public class OpenCaseState implements CaseState{
    public void close(Case customerCase){
        system.debug('** close open case');
    }
    
    public void calculateTimeSpent(Case customerCase){
    	//calculate time from date/time case status was set to "New"
    	system.debug('** calculate time spent for open case');
    }
    
    public void validate(Case customerCase){
        system.debug('** validate open case');
    }
}