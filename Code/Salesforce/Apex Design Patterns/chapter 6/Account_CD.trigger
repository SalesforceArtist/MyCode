/**
 * Chapter 6    :   Anti Pattern
 * Author       :   Jitendra Zaa
 * Description  :   Example to demonstrate Circular dependency in Trigger
 * */
trigger Account_CD on Account (before update) {

    Set<Id> setAccId = Trigger.newMap.keyset();
    
    //Get all child contacts of Account
    List<Contact> lstContact = [SELECT NAME FROM Contact WHERE AccountId IN :setAccId];
    
    for(Contact c : lstContact){
        c.Description = 'Updated from Account Trigger';
    }
    
    if(!lstContact.isEmpty())
    {
        update lstContact;
    }
}