trigger OpportunityDeleteTrigger on Opportunity ( before delete ) {
    String name = [SELECT Name FROM Profile WHERE Id =:UserInfo.getProfileId()].Name;
    
    if( name != 'System Administrator' ) {
        if( Trigger.isBefore ) {
            if( Trigger.isDelete ) {
                for( Opportunity objOpportunity : Trigger.old ) {
                    if( objOpportunity.IsClosed == true ) {
                        objOpportunity.addError( 'This opportunity cannot be deleted becase it has been closed.  Please contact Sales Operations.' );
                    }
                }
            }
        }
    }
}