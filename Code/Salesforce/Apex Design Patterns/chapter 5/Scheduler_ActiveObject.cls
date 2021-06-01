/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	Schedular class
 
	Below code can be used ti schedule this schedular to be executed every 10 minutes

   Scheduler_ActiveObject m = new Scheduler_ActiveObject();
   String sch = '0 0 0/1 1/1 * ? * ';
   String jobID = system.schedule('Active Object Scheduler', sch, m);
   
   Scheduler_ActiveObject m1 = new Scheduler_ActiveObject();
   String sch1 = '0 10 0/1 1/1 * ? * '; 
   String jobID1 = system.schedule('Active Object Scheduler - 10 Min', sch1, m1);
   
   Scheduler_ActiveObject m2 = new Scheduler_ActiveObject();
   String sch2 = '0 20 0/1 1/1 * ? * ';
   String jobID2 = system.schedule('Active Object Scheduler - 20 Min', sch2, m2);
   
   Scheduler_ActiveObject m3 = new Scheduler_ActiveObject();
   String sch3 = '0 30 0/1 1/1 * ? * ';
   String jobID3 = system.schedule('Active Object Scheduler - 30 Min', sch3, m3);
   
   Scheduler_ActiveObject m4 = new Scheduler_ActiveObject();
   String sch4 = '0 40 0/1 1/1 * ? * ';
   String jobID4 = system.schedule('Active Object Scheduler - 40 Min', sch4, m4);
   
   Scheduler_ActiveObject m5 = new Scheduler_ActiveObject();
   String sch5 = '0 50 0/1 1/1 * ? * ';
   String jobID5 = system.schedule('Active Object Scheduler - 50 Min', sch5, m5);

 * */
 public class Scheduler_ActiveObject implements Schedulable{

     public void execute(SchedulableContext ctx) { 
         new AddFund_Service_ActiveObject().execute();
     }
}