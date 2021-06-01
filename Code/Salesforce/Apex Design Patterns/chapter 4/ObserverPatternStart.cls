/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Observer Pattern example
 * */
trigger ObserverPatternStart on Music_Library__c (after update) {

    List<String> lstQualifiedSubjectIds = new List<String>();
    
    for(Integer i =0 ; i<Trigger.New.size() ; i++)
    {
        //If existing music is made public
        if(Trigger.new[i].is_Public__c && Trigger.new[i].is_Public__c != Trigger.old[i].is_Public__c){
            lstQualifiedSubjectIds.add(Trigger.new[i].id) ;
        }
    }
    
    if(!lstQualifiedSubjectIds.isEmpty())
    {
        MusicSubject sub = new MusicSubject(lstQualifiedSubjectIds);
        sub.notifyObservers();
    }
}