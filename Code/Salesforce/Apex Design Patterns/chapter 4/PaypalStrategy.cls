/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Strategy Pattern : This class is used to pay using Paypal
 * */
public class PaypalStrategy implements PaymentStrategy{
    
    private String emailId ;
    private String password;
    
    /* Constructor */
    public PaypalStrategy(String emailId , String password){
        this.emailId = emailId;
        this.password = password;
    }
    
    /* Overrided method from inteface PaymentStrategy */ 
    public void pay(Double amount){
        System.debug('Web service callout to pay using paypal Account') ;
    }

}