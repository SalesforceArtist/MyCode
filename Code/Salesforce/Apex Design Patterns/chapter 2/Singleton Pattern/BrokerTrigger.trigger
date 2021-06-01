/**
 *	Chapter 2 	- 	Singleton Pattern - Problem Statement
 *	Author		-	Jitendra Zaa 
 * */
trigger BrokerTrigger on Broker__c (before insert, before update) {

    // Instance of utility class to perform Area office 
    // related operations

    //AreaOfficeUtil util = new AreaOfficeUtil();
    AreaOfficeUtil util = AreaOfficeUtil.getInstance();
    
    for(Broker__c b : Trigger.New)
    {
        if(b.Area_Office__c == null && Trigger.isBefore && b.State__c != null && b.City__c != null)
        {
            Area_Office__c ofc = util.getOffice(b.State__c, b.City__c);
            if(ofc != null)
            {
                b.Area_Office__c = ofc.Id;
            } 
        }
    }
}