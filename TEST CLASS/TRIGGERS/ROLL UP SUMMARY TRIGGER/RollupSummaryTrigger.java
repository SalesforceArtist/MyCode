trigger ContactTrigger on Contact (before insert, after insert, before update, after update, after undelete, after delete) {
    /*for( Contact con : Trigger.New) {
       if(con.Phone != null) {
          VerifyPhoneNumbers.doFuture(con.Id);
          VerifyPhoneNumbers.sobjectAsParam(JSON.serialize(con));
       }
    }*/
    if ( Trigger.isAfter ) {
        /* Step 1 - get the List of New/Old Records */
        List<Contact> contactList = new List<Contact> ();
        Set<Id> accountIdsSet = new Set<Id>();
        if ( Trigger.isDelete ) {
            contactList = Trigger.Old; // List<sObject> => List<Contact>
        } else {
            contactList = Trigger.New;
            // Account A
            // Account B
            // A => B on Contact C
        }
        
        for ( Contact con : contactList ) {
            if (con.AccountId != null ){
                accountIdsSet.add(con.AccountId);
            }
            // Trigger.oldMap => Account as A => C
            // Trigger.New => Account B => C
            if ( Trigger.isUpdate ) {
                Contact oldContact = (Contact)Trigger.oldMap.get(con.Id); // Map<Id, sObject>
                if ( oldContact.AccountId != con.AccountId ) {
                    accountIdsSet.add(oldContact.AccountId);
                }
            }
            
        }
        /* Solution 1 */
        /*List<Account> accountList = [Select Id, Name, No_Of_Contacts__c, (Select Id, Name From Contacts )
                                    	From Account Where Id IN : accountIdsSet];
        for (Account acc : accountList) {
            List<Contact> relatedContacts = acc.Contacts;
            if ( relatedContacts != null ){
                acc.No_Of_Contacts__c = relatedContacts.size();
            } else {
                acc.No_Of_Contacts__c = 0;
            }
        }
        update accountList;*/
        /* Solution 2 */
        
        /* Aggregate Query */
        /*List<Account> accountList = new List<Account>();
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
        
        update accountList;*/
        
        /* Solution 3 */
        
        Map<Id, Account> accountMap = new Map<Id, Account>();
        // containsKey
        // put
        // get
        List<Contact> conList = [Select Id, Name, AccountId From Contact Where AccountId IN :accountIdsSet ];
        for ( Contact c : conList ) {
            if ( !accountMap.containsKey(c.AccountId) ) {
                accountMap.put(c.AccountId , new Account (Id = c.AccountId, No_Of_Contacts__c = 1 ));
            } else {
                Account tempAccount = accountMap.get(c.AccountId);
                tempAccount.No_Of_Contacts__c += 1;
                accountMap.put(c.AccountId , tempAccount );
            }
            // 00173574b3thdvd => Account()
            // 
        }
        update accountMap.values();// . List<Account>
    }
    if ( Trigger.isBefore || Trigger.isUndelete) {
        List<Contact> contactList = new List<Contact>();
        Set<String> newEmailSet = new Set<String>();
        Set<String> existingEmailSet = new Set<String>();
        if (Trigger.isBefore && ( Trigger.isInsert || Trigger.isUpdate )) {
            contactList = Trigger.New;
        } 
        if ( Trigger.IsAfter && Trigger.isUndelete ) {
            contactList = Trigger.New;
        }
        for ( Contact con : contactList ) {
            if ( con.Email != null ) {
                newEmailSet.add( con.Email );
            }
        }
        List<Contact> existingContactList = [Select Id, Email From Contact 
                                             Where Email IN: newEmailSet];
        for (Contact con : existingContactList ) {
            existingEmailSet.add( con.Email );
        }
        
        for ( Contact con : contactList ) { 
            if ( existingEmailSet.contains( con.Email ) ) {
                con.Email.AddError('Duplicate Email is not Allowed ');
            } else {
                existingEmailSet.add(con.Email);
            }
        }
    }
    
}