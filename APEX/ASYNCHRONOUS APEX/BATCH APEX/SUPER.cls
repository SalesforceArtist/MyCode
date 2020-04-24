global class UpdateAccountFields implements Database.Batchable<sObject>{
    global final String Query;
    global final String Entity;
    global final String Field;
    global final String Value;
 
    global UpdateAccountFields(String q, String e, String f, String v){
              Query=q; Entity=e; Field=f;Value=v;
    }
 
    global Database.QueryLocator start(Database.BatchableContext BC){
       return Database.getQueryLocator(query);
    }
 
    global void execute(Database.BatchableContext BC, 
                        List<sObject> scope){
       for(Sobject s : scope){s.put(Field,Value); 
       }      update scope;
    }
 
    global void finish(Database.BatchableContext BC){
 
    }
 
 }



// Query for 10 accounts
String q = 'SELECT Industry FROM Account LIMIT 10';
String e = 'Account';
String f = 'Industry';
String v = 'Consulting';
Id batchInstanceId = Database.executeBatch(new UpdateAccountFields(q,e,f,v), 5); 






 global class OwnerReassignment implements Database.Batchable<sObject>{
    String query;
    String email;
    Id toUserId;
    Id fromUserId;
    
    global Database.querylocator start(Database.BatchableContext BC){
                return Database.getQueryLocator(query);}
    
    global void execute(Database.BatchableContext BC, List<sObject> scope){
        List<Account> accns = new List<Account>();
    
       for(sObject s : scope){Account a = (Account)s;
            if(a.OwnerId==fromUserId){
                a.OwnerId=toUserId;
                accns.add(a);
                }
            }
    
    update accns;
        
    }
    global void finish(Database.BatchableContext BC){
    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    
    mail.setToAddresses(new String[] {email});
    mail.setReplyTo('batch@acme.com');
    mail.setSenderDisplayName('Batch Processing');
    mail.setSubject('Batch Process Completed');
    mail.setPlainTextBody('Batch Process has completed');
    
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
    }



    OwnerReassignment reassign = new OwnerReassignment();
reassign.query = 'SELECT Id, Name, Ownerid FROM Account ' + 
                'WHERE ownerid=\'' + u.id + '\'';
reassign.email='admin@acme.com';
reassign.fromUserId = u;
reassign.toUserId = u2;
ID batchprocessid = Database.executeBatch(reassign);







global class BatchDelete implements Database.Batchable<sObject> {
    public String query;
 
    global Database.QueryLocator start(Database.BatchableContext BC){
       return Database.getQueryLocator(query);
    }
 
    global void execute(Database.BatchableContext BC, List<sObject> scope){
       delete scope;
       DataBase.emptyRecycleBin(scope);
    }
 
    global void finish(Database.BatchableContext BC){
    }
 }


 BatchDelete BDel = new BatchDelete();
Datetime d = Datetime.now();
d = d.addDays(-1);
// Replace this value with the folder ID that contains
// the documents to delete.
String folderId = '00lD000000116lD';
// Query for selecting the documents to delete
BDel.query = 'SELECT Id FROM Document WHERE FolderId=\'' + folderId + 
    '\' AND CreatedDate < '+d.format('yyyy-MM-dd')+'T'+
    d.format('HH:mm')+':00.000Z';
// Invoke the batch job.
ID batchprocessid = Database.executeBatch(BDel);
System.debug('Returned batch process ID: ' + batchProcessId);










global class SearchAndReplace implements Database.Batchable<sObject>, 
   Database.AllowsCallouts{
}





global class SummarizeAccountTotal implements 
    Database.Batchable<sObject>, Database.Stateful{

   global final String Query;
   global integer Summary;
  
   global SummarizeAccountTotal(String q){Query=q;
     Summary = 0;
   }

   global Database.QueryLocator start(Database.BatchableContext BC){
      return Database.getQueryLocator(query);
   }
   
   global void execute(
                Database.BatchableContext BC, 
                List<sObject> scope){
      for(sObject s : scope){
         Summary = Integer.valueOf(s.get('total__c'))+Summary;
      }
   }

global void finish(Database.BatchableContext BC){
   }
}





global class SummarizeAccountTotal implements 
    Database.Batchable<sObject>, Database.Stateful{

   global final String Query;
   global integer Summary;
  
   global SummarizeAccountTotal(String q){Query=q;
     Summary = 0;
   }

   global Database.QueryLocator start(Database.BatchableContext BC){
      return Database.getQueryLocator(query);
   }
   
   global void execute(
                Database.BatchableContext BC, 
                List<sObject> scope){
      for(sObject s : scope){
         Summary = Integer.valueOf(s.get('total__c'))+Summary;
      }
   }

global void finish(Database.BatchableContext BC){
   }
}








// Implement the interface using a list of Account sObjects
// Note that the initialState variable is declared as final

global class MyBatchable implements Database.Batchable<sObject> {
    private final String initialState;
    String query;
    
    global MyBatchable(String intialState) {
      this.initialState = initialState;
    }
  
    global Database.QueryLocator start(Database.BatchableContext BC) {
      // Access initialState here 
      
      return Database.getQueryLocator(query);
    }
  
    global void execute(Database.BatchableContext BC, 
                        List<sObject> batch) {
      // Access initialState here 
      
    }
  
    global void finish(Database.BatchableContext BC) {
      // Access initialState here 
      
    }
  }