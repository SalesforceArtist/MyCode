/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This class implements Container interface of Iterator pattern
 * */
public class AccountContainer implements IContainer {
     
    public IIterator getIterator(){ 
        List<Account> lstAcc = [SELECT ID, Name, TickerSymbol FROM Account] ;
        
        return new AccountIterator(lstAcc); 
    } 
}