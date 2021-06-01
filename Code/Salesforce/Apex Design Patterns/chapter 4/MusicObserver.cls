/** 
* Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Observer Pattern example
 * */
public class MusicObserver implements IObserver{

    LIst<String> musicId ;
    
    public MusicObserver(LIst<String> mId){
        musicId = mId;
    }
    
    public void notify(){
        List<Music_Notification__c> lstMusicNotify = [SELECT 
                                                      	ID 
                                                      FROM 
                                                      	Music_Notification__c 
                                                     Where 
                                                      	Music_Library__c IN: musicId 
                                                      	AND 
                                                      	Subscribe__c = true] ;
        
        if(!lstMusicNotify.isEmpty())
        {
            for(Music_Notification__c mn : lstMusicNotify)
            {
                mn.Send_Email__c = true ; 
            }
            
            //Workflow rule is written to send email if "Send_Email__c" is true
            update lstMusicNotify ;
        }
    }
}