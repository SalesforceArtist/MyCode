/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Strategy Pattern : This class is used calculate payment amount
 * */
public class ShoppingCart {
    
    List<Music_Library__c> lstSongs ;
        
    /*Constructor*/
    public ShoppingCart()
    {
        lstSongs = new List<Music_Library__c>();
    }
    
    /* Add music in cart */
    public void addSong(Music_Library__c m){
        lstSongs.add(m);
    }
    
    /* Remove music song from cart */
    public void removeSong(Music_Library__c songToRemove){
        Integer index = -1 ; 
        for(Music_Library__c m : lstSongs)
        {
            index ++;
            if(m.Id == songToRemove.Id){
                lstSongs.remove(index);
                break ;
            }
        }
        
    }
    
    /* Calculate total amount and pay using selected mechanism*/
    public void pay(PaymentStrategy payMethod){
        Double finalAmount = 0;
        
        for(Music_Library__c m : lstSongs)
        {
            finalAmount = finalAmount+m.price__c ;
        }
        System.debug('Total amount to be paid - '+finalAmount) ;
        payMethod.pay(finalAmount) ;
    }
}