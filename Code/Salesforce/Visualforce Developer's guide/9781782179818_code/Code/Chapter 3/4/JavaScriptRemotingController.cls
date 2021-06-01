global with sharing class JavaScriptRemotingController {
   
    public List<Order__c> Orders{
        get{
         Orders = new List<Order__c>();
        Orders = [SELECT id, Name, Customer__c, Status__c, Planned_Delivery_Date__c, Delivered__c FROM Order__c LIMIT 1000];
        return Orders;
        }
        set;
    }
    
    public JavaScriptRemotingController(){
       
    } 

@RemoteAction
global static Item__c doStartShipping(String para){
    Order__c updateOrder;        
    try{
       updateOrder=[SELECT id, Name, Customer__c, Status__c, Planned_Delivery_Date__c, Delivered__c FROM Order__c Where Id =: para];        
       updateOrder.Status__c = 'Shipping';
           update updateOrder;   
                
    }catch(DMLException e){
         ApexPages.addMessages(e);
         return null;   
    }        
return null;
}
}