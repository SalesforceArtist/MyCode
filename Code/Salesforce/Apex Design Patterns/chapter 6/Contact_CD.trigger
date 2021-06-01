/**
 * Chapter 6    :   Anti Pattern
 * Author       :   Jitendra Zaa
 * Description  :   Example to demonstrate Circular dependency in Trigger
 * */
trigger Contact_CD on Contact (before update) {

    Set<Id> setAcc = new Set<Id>();
    
    //Get Account Id from Contact
    for(Contact c : Trigger.New)
    {
        if(c.AccountId != null)
        {
            setAcc.add(c.AccountId);
        }
    }
    
    //Get all parent Account and update there description field
    List<Account> lstAcc = [SELECT Name FROM Account Where Id IN :setAcc];
    
    for(Account acc : lstAcc)
    {
        acc.Description = 'updated from Contact Trigger';
    }
    
    if(!lstAcc.isEmpty())
    {
        update lstAcc;
    }

}