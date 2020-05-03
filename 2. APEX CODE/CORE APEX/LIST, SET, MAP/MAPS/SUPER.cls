Account[] accs = new Account[5]; // Account[] is synonymous with List<Account>
Map<Integer, List<Account>> m4 = new Map<Integer, List<Account>>{1 => accs};



// Populate map from SOQL query
Map<ID, Account> m = new Map<ID, Account>([SELECT Id, Name FROM Account LIMIT 10]);
// After populating the map, iterate through the map entries
for (ID idKey : m.keyset()) {
    Account a = m.get(idKey);
    System.debug(a);
}


Account myAcct = new Account();                        //Define a new account
Map<Integer, Account> m = new Map<Integer, Account>(); // Define a new map
m.put(1, myAcct);                  // Insert a new key-value pair in the map
System.assert(!m.containsKey(3));  // Assert that the map contains a key
Account a = m.get(1);              // Retrieve a value, given a particular key
Set<Integer> s = m.keySet();       // Return a set that contains all of the keys in the map