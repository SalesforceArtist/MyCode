/**
 * Interface to case state handlers 
 */
public class CaseContext {
    public CaseState State {get; set;}
    
    public CaseContext(String caseStatus){
        if(caseStatus == 'New'){
        	this.State = new NewCaseState();    
        }
        else if(caseStatus == 'Open'){
        	this.State = new OpenCaseState();    
        }
        else if(caseStatus == 'In Process'){
        	this.State = new InProcessCaseState();    
        }
        else if(caseStatus == 'Closed'){
        	this.State = new ClosedCaseState();    
        }
    }
    
    public void close(Case customerCase){
        State.close(customerCase);
    }
    
    public void calculateTimeSpent(Case customerCase){
        State.calculateTimeSpent(customerCase);
    }
    
    public void validate(Case customerCase){
        State.validate(customerCase);
    }
}