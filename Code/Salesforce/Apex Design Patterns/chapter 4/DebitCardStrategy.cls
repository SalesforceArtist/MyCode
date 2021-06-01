/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Strategy Pattern : This class is used to pay using debit card
 * */
public class DebitCardStrategy implements PaymentStrategy{
	
    private String name;
    private String cardNumber;
    private String pin; 
    
    /* Constructor */
    public DebitCardStrategy(String name, String cardNumber, String pin){
        this.name = name;
        this.cardNumber = cardNumber;
        this.pin = pin;
    }
    
    /* method from inteface PaymentStrategy */ 
    public void pay(Double amount){
        System.debug('Web service callout to pay using Debit Card') ;
    }
    
}