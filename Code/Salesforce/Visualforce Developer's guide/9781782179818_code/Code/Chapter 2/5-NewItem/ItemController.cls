public with sharing class ItemController {

    public Item__c NewItem{get;set;}//public item property for new insertion
    
    public ItemController(){
        NewItem = new Item__c();
    }
        
    //get existing items to show in a table
    public List<Item__c> ExistingITems{
        get{
            ExistingITems = new List<Item__c>();
            ExistingITems = [SELECT Id, Name, Item_Name__c, Unit_Price__c FROM Item__c LIMIT 100];
            return ExistingITems;
        }
        set;
    }
        
    public PageReference insertNewItem() {
        try{
            insert NewItem;        
            //reset public property for new insert
            NewItem = new Item__c();
        }catch(DmlException ex){
            ApexPages.addMessages(ex);
        }
        
        return null;
    }
}