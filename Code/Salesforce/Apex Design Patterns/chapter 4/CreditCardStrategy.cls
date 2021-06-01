/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Strategy Pattern : This class is used to pay using credit card
 * */
public class CreditCardStrategy implements PaymentStrategy{
    
    private String name;
    private String cardNumber;
    private String cvv;
    private String dateOfExpiry;
    
    /* Constructor */
    public CreditCardStrategy(String name, String cardNumber, String cvv, String dateOfExpiry){
        this.name = name;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.dateOfExpiry = dateOfExpiry;        
    }
    
    /* method from inteface PaymentStrategy */ 
    public void pay(Double amount){
        System.debug('Web service callout to pay using credit card') ;
    }
}