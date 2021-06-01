/**
 * New case state handler
 */
public class NewCaseState implements CaseState{
    public void close(Case customerCase){
        system.debug('** close new case');
    }
    
    public void calculateTimeSpent(Case customerCase){
    	//calculate time from date/time case was created
    	system.debug('** time calculation not applicable for new case');
    }
    
    public void validate(Case customerCase){
        system.debug('** validate new case');
    }
}