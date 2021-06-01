global class learnSOAP {
    
    //Define webservice method using ‘webservice’ keyword
    webservice static string updateAccountName(id acctId, string newName){

        //String to hold return message
        string resultMessage; 

        try{
            //Instantiate a new Account with existing Id
            Account a = new Account(id=acctid);

            //Set account name
            a.name = newName;  
          	update a; // perform DML
            resultMessage = 'Success'; //set success
        }
        catch(Exception e){
            //Catch exception and gather information
            resultMessage = e.getLineNumber()+ ' | ';
            resultMessage += 'Error: '+e.getMessage(); 
        }
        return resultMessage; //return 
    }
}
