global class UpdateAccountFieldsBatch implements Database.Batchable<sObject>{
   global final String Query;
   global final String Entity;
   global final String Field;
   global final String Value;

   global UpdateAccountFieldsBatch(String q, String e, String f, String v){
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
String e = 'Accountss';
String f = 'Industry';
String v = 'Consultingggg';
Id batchInstanceId = Database.executeBatch(new UpdateAccountFieldsBatch(q,e,f,v), 5); 





// Query for accounts that aren't in the Recycle Bin
String q = 'SELECT Industry FROM Account WHERE isDeleted=false LIMIT 10';
String e = 'Account';
String f = 'Industry';
String v = 'Consulting';
Id batchInstanceId = Database.executeBatch(new UpdateAccountFields(q,e,f,v), 5); 