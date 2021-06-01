public class CustomerSummaryComponenetController{
    public String CusID{get;set;}
    public Integer RecentNo{get;set;}
    public Customer__c CurrentCustomer{
        get{
            CurrentCustomer = new Customer__c();
            CurrentCustomer = [SELECT Id, Name, Address__c, Email__c, Telephone__c FROM Customer__c WHERE Id =: CusID];
            return CurrentCustomer;
        }
        set;
    }
    
    
    public List<Order__c> RecentOrderList{
        get{
            RecentOrderList = new List<Order__c>();
            RecentOrderList = [SELECT Id, Name, Customer__c, Delivered__c, Planned_Delivery_Date__c, Status__c FROM Order__c WHERE Customer__c =: CusID ORDER BY CreatedDate DESC LIMIT :RecentNo];
            return RecentOrderList;
        }
        set;        
    }
}