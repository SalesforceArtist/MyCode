public class DynamicBindingsMapListExample
{
    public Map<string, List<Customer__c>> customerMap{get; set;}
    public List<selectoption> keys {get; set;}
    public String selectedKey {get;set;}
    public Map<string, Customer__c> custByName {get;set;}
     
    public Set<string> getMapKeys()
    {
        return customerMap.keySet();
    }
     
    public DynamicBindingsMapListExample()
    {
        custByName = new Map<string, Customer__c>();
        List<string> sortedKeys=new List<string>();
        customerMap = new Map<string, list<Customer__c>>();
        customerMap.put('All', new List<Customer__c>());
        List<Customer__c> customers = [SELECT Id, Name, Email__c, Address__c FROM Customer__c ORDER BY Name asc];
                             
                             
        for (Customer__c tempCustomer : customers)
        {
            customerMap.get('All').add(tempCustomer);
            String start = tempCustomer.Name.substring(0,1);
            List<Customer__c> custFromMap = customerMap.get(start);
            if (custFromMap == null)
            {
                custFromMap =new List<Customer__c>();
                customerMap.put(start, custFromMap);
            }
            custFromMap.add(tempCustomer);
            custByName.put(tempCustomer.name, tempCustomer);
        }
         
        keys=new List<selectoption>();
        for (String key : customerMap.keySet())
        {
            if (key != 'All')
            {
                sortedKeys.add(key);
            }
        }
        sortedKeys.sort();
        sortedKeys.add(0, 'All');
         
        for (String key : sortedKeys)
        {
            keys.add(new SelectOption(key, key));
        }
         
        selectedKey='All';
    }
}