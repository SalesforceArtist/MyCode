//The first line must define this class as REST
//The urlMapping parameter defines the endpoint
@RestResource(urlMapping='/learnRest_Endpoint/*')

//the class must be global
global class learnREST {
	
	//Define GET behavior
	@HttpGet
	global static void response(){
		//Retrieve url parameters
		string acctId = RestContext.request.params.get('aid');

		//in case URI format was used /learnRest_Endpoint/aid
		acctId = RestContext.requestURI.substringAfterLast(‘/’);

		string aName = RestContext.request.params.get('aName');
		
		//Query for Account record where the id is a match
		Account a = [select id, name, phone, industry, website, fax, type from Account where id = :acctId or name = :aName];
		
		//Use built in JSON methods to convert Account sObject into JSON representation
		string responseValue = JSON.serialize(a);
		
		//Set return type
		RestContext.response.addHeader('Content-Type', 'application/json');
		
		//Set value of return
		RestContext.response.responseBody = Blob.valueOf(responsevalue);

		//Set the response code of the response
		//HTTP Response codes
		RestContext.response.statusCode = 200;
	}

	//Define POST behavior
	@HttpPost
	global static void posting(Account acct){
		//Retrieve URL parameters
		string aName = RestContext.request.params.get('aName');
		try{
			//Set new name if supplied
			if (string.isNotBlank(aName)) acct.name = aName;
			//Upsert Account
			upsert acct;
			//Success
			RestContext.response.statusCode = 200;
			RestContext.response.responseBody = blob.valueof('Success');
		}
		catch(Exception e){
			//Accepted, but not processed
			RestContext.response.statusCode = 400;
			RestContext.response.responseBody = blob.valueOf(e.getLineNumber()+' | Error: '+e.getMessage());
		}
	}
}