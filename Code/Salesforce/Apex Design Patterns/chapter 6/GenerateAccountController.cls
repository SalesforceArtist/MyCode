/**
 * Chapter 6    :   Anti Pattern
 * Author       :   Anshul Verma
 * Description  :   This class shows usage of effective exception handling
 * */
public class GenerateAccountController {
    public Account NewAccount {get; set;}
    public String ContactLimit {get; set;}
    
    public GenerateAccountController(){
        NewAccount = new Account();
    }
    
    public void createAccount(){
        System.savepoint sp = Database.setSavepoint();
        try{
            //insert NewAccount;
            
            if(Newaccount.Type == 'Prospect'){
                Contact c = new Contact(LastName = NewAccount.Name, 
                                        Phone = NewAccount.Phone, 
                                        Limit__c = Integer.valueOf(ContactLimit),
                                        Accountid = NewAccount.id);
                insert c;
            }
        }
        catch(TypeException typeEx){
            /* rollback transaction */
            Database.rollback(sp);
            
            /* display error message */
            String errMsg = 'Contact limit should be a number';
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, errMsg);
            Apexpages.addMessage(msg);
        }
        catch(Exception ex){
            /* rollback transaction */
            Database.rollback(sp);
            
            /* display error message */
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, ex.getMessage());
            System.debug(ex);
            Apexpages.addMessage(msg);
        }
    }
}