/**
 * Closed case state handler
 */
public class ClosedCaseState implements CaseState{
    public void close(Case customerCase){
        system.debug('** Error - closed case cannot be closed');
    }
    
    public void calculateTimeSpent(Case customerCase){
    	system.debug('** calculate time spent for close case');	
    }
    
    public void validate(Case customerCase){
		system.debug('** Error - closed case cannot be validated');
    }
}