public with sharing class SearchItemController {

    public List<Item__c> ExistingItems{get;set;}
    public String Keyword{get;set;}
    
    public SearchItemController(){
        ExistingItems = new List<Item__c>();
    }
    
    public void SearchItems(){       
        
        ExistingItems = [SELECT Id, Name, Item_Name__c, Unit_Price__c FROM Item__c WHERE Item_Name__c LIKE: ('%'+Keyword+'%')];        
    }
}