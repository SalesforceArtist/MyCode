public with sharing class OrderViewExtension{
   
    public Order__c CurrentOrder{get;set;}
    public List<Order_Line__c> OrderLines{get;set;}
    
    public OrderViewExtension(ApexPages.StandardController controller){
        CurrentOrder = new Order__c();
        this.CurrentOrder = (Order__c)controller.getRecord();
        prepareFullOrder();
    }
    
    public void prepareFullOrder(){
        OrderLines = new List<Order_Line__c>();
        OrderLines = [SELECT Id, Name, Price__c, Item__c, Item__r.Unit_Price__c,Item__r.Item_Name__c, Order__c, Quantity__c FROM Order_Line__c WHERE Order__c =: this.CurrentOrder.Id];
    }
    

}