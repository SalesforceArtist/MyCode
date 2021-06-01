public with sharing class googleAuthorization_Controller {
	public string googleEmail {get;set;}
	//to store our code for dynamic rendering
	public string code {get;set;} 
	//to store our user record
	public User u {get;set;}
	public googleAuthorization_Controller() {
		googleEmail = userInfo.getUserEmail();
	}

	//page action
	public pagereference doOnLoad(){
		//retrieve current page
		Pagereference p = ApexPages.currentPage();
		//does it have a code as parameter?
		code = p.getParameters().get('code');
		//no? then stop
		if (string.isBlank(code)) return null;
		//it had one! get the state, aka email we passed
		//note you don't want to use googleEmail here
		//since we came back to the page, it reloaded and
		//the controller was reinstantiated, overriding our
		//input with the user's email
		string passedEmail = p.getParameters().get('state');

		//query for the user, with token fields so we can modify
		u = [select id, Google_Access_Token__c, Google_Refresh_Token__c from User where id = :userInfo.getUserId()];

		//call our api method to get tokens parsed into user
		u = googleCalendar_API.obtainAccessToken(u, code, googleCalendar_API.SF_AUTH_PAGE);

		//if we had no error
		if (u.Google_Access_Token__c != 'error'){
			//set the google email
			u.google_email__c = passedEmail;
			//update the user and display success message
			update u;
			ApexPages.addMessage(new ApexPages.message(ApexPages.severity.confirm,'Authorized Successfully!'));
		}
		else{
			//had an error? well then let us know <sadface>
			ApexPages.addMessage(new ApexPages.message(ApexPages.severity.error,'Authorization Error.'));	
		}
		//stay here, not going anywhere!
		return null;
	}

	public pagereference requestAuthorization(){
		return googleCalendar_API.loginRequestPage(
			googleCalendar_API.SF_AUTH_PAGE,
			googleEmail);
	}
}