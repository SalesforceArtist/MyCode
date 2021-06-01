/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Observer Pattern example
 * */
public interface ISubject {
	
    void subscribe(Music_Notification__c observer);
    void unSubscribe(Music_Notification__c observer);
    void notifyObservers();     
}