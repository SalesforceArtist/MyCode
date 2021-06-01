public with sharing class DynamicOrderExtension {
    public final Order__c orderDetails { get; private set; }
    
    public DynamicOrderExtension(ApexPages.StandardController controller) { 
        String qid = ApexPages.currentPage().getParameters().get('id');
        String theQuery = 'SELECT Id, ' + joinList(editableFields, ', ') +
        ' FROM Order__c WHERE Id = :qid';
        this.orderDetails = Database.query(theQuery);
        controller.addFields(editableFields);
    }
    
    public List<String> editableFields {
        get {
            if (editableFields == null) {
                editableFields = new List<String>();
                editableFields.add('Delivered__c');
                editableFields.add('Customer__c');
                editableFields.add('Planned_Delivery_Date__c');
                editableFields.add('Status__c');
                editableFields.add('Customer__r.Email__c');
            }
            return editableFields ;
        }
        private set;
    }
    
    private static String joinList(List<String> theList, String separator) {
       
        if (theList == null) {
            return null;
        }
        
        if (separator == null) {
            separator = '';
        }
        
        String joined = '';
        Boolean firstItem = true;
        
        for (String item : theList) {
            if(null != item) {
                if(firstItem){
                    firstItem = false;
                }
                else {
                    joined += separator;
                }
                joined += item;
            }
        }
        return joined;
    }
}