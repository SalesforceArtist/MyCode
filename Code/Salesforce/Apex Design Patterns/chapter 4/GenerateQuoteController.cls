/**
 * Originator for Memento Demo - handles genration of memento objects
 * */
public class GenerateQuoteController {
    
    CareTaker demoCareTaker;
    public Quote Quote {get; set;}
    
    //constructor
    public GenerateQuoteController(){
        String quoteId = System.currentPageReference().getParameters().get('id');
        loadData(quoteId);
    }
    
    public void loadData(Id quoteID){
        demoCareTaker = new CareTaker();
        if(quote == null){
            quote = new Quote(); 
        }
        
        if(quoteID != null){
        	quote = [select id, Name, OpportunityId , Assumptions__c, ExpirationDate, LegalClauses__c, OutOfScope__c, Status, State__c, Scope__c from quote where id = :quoteId];
            demoCareTaker = new CareTaker(quote.State__c);
        }
        else{
            //do nothing
        }
    }
    
    public void save(){
        saveState();
        upsert quote;
    }
    
    private Memento generateMemento(){
        Memento newState = new Memento();
        newState.Assumptions = quote.Assumptions__c;
        newState.ExpirationDate = quote.ExpirationDate;
        newState.LegalClauses = quote.LegalClauses__c;
        newState.OutOfScope = quote.OutOfScope__c;
        newState.Status = quote.Status;
        newState.Scope = quote.Scope__c;
        return newstate;
    }
    
    private void saveState(){
        //generate memento for current state
        Memento newstate = generateMemento();
        
        //add state to caretaker
        demoCareTaker.addState(newState);
        
        //searlize caretaker for persistence
        quote.State__c = Json.serialize(demoCareTaker);
    }
    
    private void restoreState(Memento state){
        quote.Assumptions__c = state.Assumptions;
        quote.ExpirationDate = state.ExpirationDate;
        quote.LegalClauses__c = state.LegalClauses;
        quote.OutOfScope__c = state.OutOfScope;
        quote.Status = state.Status;
        quote.Scope__c = state.Scope;
    }
    
    public void undo(){
        //retrieve old state
		Memento previousState = demoCareTaker.getPreviousState();
        
        //restore old state
        restoreState(previousState);
    }
    
    public void cancel(){
        //handle cancel button click
    }
}