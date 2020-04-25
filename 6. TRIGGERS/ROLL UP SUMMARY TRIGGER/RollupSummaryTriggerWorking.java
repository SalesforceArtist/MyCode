trigger ContactTrigger on Contact (before insert, after insert, before update, after update, after undelete, after delete) {
    
    if ( Trigger.isAfter ) {
        
        List<Contact> contactList = new List<Contact> ();
        Set<Id> accountIdsSet = new Set<Id>();
        if ( Trigger.isDelete ) {
            contactList = Trigger.Old; 
        } else {
            contactList = Trigger.New;
            
        }
        
        for ( Contact con : contactList ) {
            if (con.AccountId != null ){
                accountIdsSet.add(con.AccountId);
            }
            
            if ( Trigger.isUpdate ) {
                Contact oldContact = (Contact)Trigger.oldMap.get(con.Id); 
                if ( oldContact.AccountId != con.AccountId ) {
                    accountIdsSet.add(oldContact.AccountId);
                }
            }
            
        }
        
        /* Aggregate Query */
        List<Account> accountList = new List<Account>();
        List<AggregateResult> agrResult = [Select AccountId, Count(Id) from Contact
                                           Where AccountId IN : accountIdsSet
                                           Group By AccountId ];
        Integer size = agrResult.size();
        for ( Integer i =0; i < size ;  i ++ )  {
            AggregateResult agr = agrResult.get(i);
            Id accountId = (Id)agr.get('AccountId');
            Decimal count = (Decimal)agr.get('expr0');
            Account acc = new Account(Id = accountId, No_Of_Contacts__c = count);
            accountList.add(acc);
            if ( accountIdsSet.contains( accountId )) {
                accountIdsSet.remove(accountId);
            }
        }
        for ( Id accId : accountIdsSet ) {
            Account acc = new Account(Id = accId, No_Of_Contacts__c = 0 );
            accountList.add(acc);
        }
        
        update accountList;
        
        
    }
    
    
    
}