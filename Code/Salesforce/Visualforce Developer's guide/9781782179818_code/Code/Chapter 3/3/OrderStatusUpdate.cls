public with sharing class OrderStatusUpdate {

    public List<Order__c> Orders{get;set;}
    
    public OrderStatusUpdate(){
        Orders = new List<Order__c>();
        Orders = [SELECT id, Name, Customer__c, Status__c, Planned_Delivery_Date__c, Delivered__c FROM Order__c LIMIT 1000];
    }
}