/**
 *	Chapter 2 	- 	Singleton Pattern - Problem Statement
 *	Author		-	Jitendra Zaa 
 * */
trigger OpportunityTrigger on Opportunity (before insert, before update, after update) {
	
    //Instance of utility class to perform Area office related operations
    //AreaOfficeUtil util = new AreaOfficeUtil();
    AreaOfficeUtil util = AreaOfficeUtil.getInstance();
    
    //This set will hold Id of all closed won Opportunities
    Set<Id> setClosedWonOpp = new Set<Id>();
    
    for(Opportunity opp : Trigger.New)
    {
        //Make sure Opportunity should not be tried to be 
        // updated in after trigger, else we will get 
        // "record read only" error

        if(!Trigger.isAfter)
        {
            //If Area Office field is not populated and 
            //state, city is valued

            if(opp.Area_Office__c == null && opp.State__c != null && opp.City__c != null )
            {
                Area_Office__c ofc = util.getOffice(opp.State__c, opp.City__c);
                if(ofc != null)
                {
                    opp.Area_Office__c = ofc.Id;
                } 
            }
        }
        
        
        //If Opportunity is closed won then update all related brokers qualified for commision
        if(opp.StageName == 'Closed Won' && Trigger.isAfter && Trigger.isUpdate){
            setClosedWonOpp.add(opp.Id);
        }
        
    }
    
    //Save SOQL if there set is empty
    if(!setClosedWonOpp.isEmpty())
    {
        List<Broker__c> lstBrokersToUpdate = [
        				Select 
                            Id,
                            Commision__c,
                            Opportunity__c 
                        FROM 
                        	Broker__c 
                        WHERE
                        	Opportunity__c IN:setClosedWonOpp ];
        for(Broker__c b : lstBrokersToUpdate)
        {
            b.Commision__c = true;
        }
        
        //update all qualified brokers at once
        Database.update(lstBrokersToUpdate,false); 
    }
     
}