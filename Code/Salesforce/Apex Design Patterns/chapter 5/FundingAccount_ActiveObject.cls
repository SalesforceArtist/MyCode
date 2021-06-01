/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	Active Object class which takes care of adding amount.
 * 				:	This class can be used to perform many operations related
 * 				:	to "Fund_Account__c" record.
 * */
 
/**
*	This class will work as an Active Object and
*	it known what operation needs to be performed
*	when it is invoked.
*/ 
public class FundingAccount_ActiveObject {
    
    private Fund_Account__c obj ;
    private Decimal amountTobeAdded ;
    
	//Constructor
    public FundingAccount_ActiveObject(Fund_Account__c obj, Decimal amount){
        this.obj = obj;
        this.amountTobeAdded = amount;
    }
    
	//This method knows what operation to perform
    public void performAddOperation(){
        if(amountTobeAdded != null)
            obj.Available_Fund__c = obj.Available_Fund__c + amountTobeAdded ;
    }
}