// Create a savepoint because the data should not be committed to the database
Savepoint sp = Database.setSavepoint(); 

insert new Account[]{new Account(Name = 'yyy'), 
                     new Account(Name = 'yyy'), 
                     new Account(Name = 'yyy')};

// The single sObject format executes the for loop once per returned record
Integer i = 0;
for (Account tmp : [SELECT Id FROM Account WHERE Name = 'yyy']) {
    i++;
}
System.assert(i == 3); // Since there were three accounts named 'yyy' in the
                       // database, the loop executed three times

// The sObject list format executes the for loop once per returned batch
// of records
i = 0;
Integer j;
for (Account[] tmp : [SELECT Id FROM Account WHERE Name = 'yyy']) {
    j = tmp.size();
    i++;
}
System.assert(j == 3); // The list should have contained the three accounts
                       // named 'yyy'
System.assert(i == 1); // Since a single batch can hold up to 200 records and,
                       // only three records should have been returned, the 
                       // loop should have executed only once

// Revert the database to the original state
Database.rollback(sp); 







for (Account acct : [SELECT Id, Name, (SELECT Id, Name FROM Contacts) 
                    FROM Account WHERE Id IN ('<ID value>')]) { 
    List<Contact> contactList = acct.Contacts; // Causes an error
    Integer count = acct.Contacts.size(); // Causes an error
}


for (Account acct : [SELECT Id, Name, (SELECT Id, Name FROM Contacts) 
                    FROM Account WHERE Id IN ('<ID value>')]) { 
    Integer count=0;
    for (Contact c : acct.Contacts) {
        count++;
    }
}