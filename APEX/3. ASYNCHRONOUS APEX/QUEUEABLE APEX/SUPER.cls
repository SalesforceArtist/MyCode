public class AsyncExecutionExample implements Queueable {
    public void execute(QueueableContext context) {
        Account a = new Account(Name='Acme',Phone='(415) 555-1212');
        insert a;        
    }
}



ID jobID = System.enqueueJob(new AsyncExecutionExample());



AsyncApexJob jobInfo = [SELECT Status,NumberOfErrors FROM AsyncApexJob WHERE Id=:jobID];


public class AsyncExecutionExample implements Queueable {
    public void execute(QueueableContext context) {
        // Your processing logic here       

        // Chain this job to next job by submitting the next job
        System.enqueueJob(new SecondJob());
    }
}


@isTest
public class AsyncExecutionExampleTest {
    static testmethod void test1() {
        // startTest/stopTest block to force async processes 
        //   to run in the test.
        Test.startTest();        
        System.enqueueJob(new AsyncExecutionExample());
        Test.stopTest();
        
        // Validate that the job has run
        // by verifying that the record was created.
        // This query returns only the account created in test context by the 
        // Queueable class method.
        Account acct = [SELECT Name,Phone FROM Account WHERE Name='Acme' LIMIT 1];
        System.assertNotEquals(null, acct);
        System.assertEquals('(415) 555-1212', acct.Phone);
    }
}