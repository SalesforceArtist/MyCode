
 public class UniversalScheduler implements Schedulable{
    public Database.Batchable<SObject> batchClassName{get;set;}
    public Integer batchScopeSize{get;set;} {batchScopeSize = 200;}
    public void execute(SchedulableContext sc) {
       Database.executebatch(batchClass, batchSize);
      }
  }
  
  
   AccountBatchProcess accBatch = new AccountBatchProcess(); // Batch Class Name
  UniversalScheduler scheduler = new UniversalScheduler();
  scheduler.batchClass = accBatch;
  scheduler.batchSize = 100;
  String sch = '0 45 0/1 1/1 * ? *';
  System.schedule('Account Batch Process Scheduler', sch, scheduler);
  
  
   ContactBatchProcess cntBatch = new ContactBatchProcess(); // Batch Class Name
  UniversalScheduler scheduler = new UniversalScheduler();
  scheduler.batchClass = cntBatch;
  scheduler.batchSize = 500;
  String sch = '0 45 0/1 1/1 * ? *';
  System.schedule('Contact Batch Process Scheduler', sch, scheduler);
  