/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Observer Pattern example
 * */
public class MusicSubject implements ISubject{
	  
    LIst<String> musicId ;
    
    public MusicSubject(LIst<String> mId){
        musicId = mId ;
    }
    
    public void subscribe(Music_Notification__c observer)
    { 
        observer.Subscribe__c = true;
        insert observer;
    }
    
    /**
     * Assuming parameter observer will only have email addres and music Id
     * */
    public void unSubscribe(Music_Notification__c observer)
    {
        List<Music_Notification__c> lstExistingSubsriber = [SELECT 
                                                            	ID 
                                                            FROM 
                                                            	Music_Notification__c 
                                                            WHERE 
                                                            	Email_Address__c = :observer.Email_Address__c
                                                           	AND
                                                           		Music_Library__c =: observer.Music_Library__c] ;
        
        if(!lstExistingSubsriber.isEmpty())
        {
            for(Music_Notification__c m : lstExistingSubsriber){ 
            	m.Subscribe__c = false;
        	}
            
            update lstExistingSubsriber ;
        }  
    }
    
    public void notifyObservers()
    {
        IObserver obs = new MusicObserver(musicId);
        obs.notify();
        
    }
    
}