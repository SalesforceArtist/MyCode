
/**
 *
 * This Apex Test Class Created to cover the Opportunity Trigger
 *  - Created Test User with non system admin profile
 *  - Used Syste.runAs to execute the test user
 *  - Created Opportunity Record
 *  - Deleted Opporutnity
 *  - Check AddError validation as per the Trigger
 *
 * @author  Sakthivel Madesh
 * @date    Sep 25, 2019
 */
@isTest
public class OpportunityDeleteTriggerTestClass {
    
    static testMethod void createOppMethod() {
        
        try {            
                Test.startTest();            
                Profile prof = [SELECT Id FROM Profile WHERE Name = 'Standard User']; //get a profile Id
                User testUser = new User(Alias = 'TDemo', Email = 'sakthi@theblogreaders.com', EmailEncodingKey = 'ISO-8859-1', FirstName = 'Demo', LanguageLocaleKey = 'en_US', LastName = 'User', LocaleSidKey = 'en_US', ProfileId = prof.Id, TimeZoneSidKey = 'America/Denver', Username = 'demo.sakthi@theblogreaders.com'); 
                insert testUser;
                System.runAs(testUser) {
                    Opportunity createOpp = new Opportunity();
                    createOpp.Name='test opp';
                    createOpp.StageName='Closed Won';
                    createOpp.Probability = 95;
                    createOpp.CloseDate=system.today();
                    insert createOpp;
                    Delete createOpp;
                
                    //Apex Trigger addError Checking
                    Opportunity testResult = [SELECT Id, IsClosed FROM Opportunity WHERE Id =: createOpp.Id];
                    system.debug('testResult.IsClosed:::'+testResult.IsClosed);
                    system.assertEquals(true, testResult.IsClosed);
            	}
            Test.stopTest();
            
        } catch(Exception e) {
            system.debug('error::'+e);
        }
    }
}
