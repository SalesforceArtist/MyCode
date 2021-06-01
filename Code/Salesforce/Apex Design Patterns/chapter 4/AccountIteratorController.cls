/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Controller class to be used for navigating Contact
 * */
public class AccountIteratorController {    
    @AuraEnabled
    public static String getAccount(Integer index){
        IIterator accntIterator = new AccountContainer().getIterator();
        
        if(index == null) 
            index = 0;
          
        accntIterator.setCurentIndex(Integer.valueOf(index)); 
        
        if(accntIterator.hasNext())
        {  
            return JSON.serialize(accntIterator.next()); 
        }
        
        return 'empty'; 
    }
}