public static testMethod void testBatch() {
    user u = [SELECT ID, UserName FROM User 
              WHERE username='testuser1@acme.com'];
    user u2 = [SELECT ID, UserName FROM User 
               WHERE username='testuser2@acme.com'];
    String u2id = u2.id;
 // Create 200 test accounts - this simulates one execute.  
 // Important - the Salesforce.com test framework only allows you to 
 // test one execute.  
 
    List <Account> accns = new List<Account>();
       for(integer i = 0; i<200; i++){
          Account a = new Account(Name='testAccount'+ i, 
                      Ownerid = u.ID); 
          accns.add(a);
       }
    
    insert accns;
    
    Test.StartTest();
    OwnerReassignment reassign = new OwnerReassignment();
    reassign.query='SELECT ID, Name, Ownerid ' +
             'FROM Account ' +
             'WHERE OwnerId=\'' + u.Id + '\'' +
             ' LIMIT 200';
    reassign.email='admin@acme.com';
    reassign.fromUserId = u.Id;
    reassign.toUserId = u2.Id;
    ID batchprocessid = Database.executeBatch(reassign);
    Test.StopTest();
 
    System.AssertEquals(
            database.countquery('SELECT COUNT()'
               +' FROM Account WHERE OwnerId=\'' + u2.Id + '\''),
            200);  
    
    }
 }