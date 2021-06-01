public with sharing class googleCalendar_API {

	/********************** START CONSTANTS ***************************/
	static String GOOGLE_API_CLIENT_ID = '597569341066-qv6cfgf5rog5vcocaqeadfld5mk8t38u.apps.googleusercontent.com';
	static String GOOGLE_API_CLIENT_SECRET = 'jdDPRZx_S2G3ZDhHmPDQ-by7';

	static String GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';
	static String GOOGLE_CALENDAR_BASE_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
	static String GOOGLE_CALENDAR_EVENTS_PATH = '/events';

	public static String SF_AUTH_PAGE = 
		'https://na17.salesforce.com/apex/googleAuthorization';

	static Map<String,String> operationMap = new Map<String,String>{'INSERT'=>'POST','UPDATE'=>'PATCH','DELETE'=>'DELETE'};
	static map<id,User> userMap = new map<id,User>([select id, name, google_Email__c, Google_Access_Token__c, Google_Refresh_Token__c from User where isActive=true]);

	//carriage return
	static String cr = '\r\n';
	/********************** END CONSTANTS ***************************/

	static TimeZone tz = UserInfo.getTimeZone();
	public static String convertDateTimeToString(DateTime dt){
		Integer x = tz.getOffset(dt)/3600000;
		String z = '';
		if ( x > 0 ) z += '+';
		else z += '-';
		
		if ( x > 9 || x < -9 ) z += math.abs(x);
		else z += '0'+math.abs(x);
		
		z += ':00';
		
		return dt.format('yyyy-MM-dd\'T\'HH:mm:ss'+z);
	}

	public static httpResponse callGoogle(String endpoint, String method, String body){
		HttpRequest req = new HttpRequest();
		req.setEndpoint(endpoint);
		req.setMethod(method);
		req.setCompressed(false);
		req.setHeader('User-Agent','learnApex API');
		req.setHeader('Encoding','iso-8859-1');
		req.setHeader('Content-Type','application/x-www-form-urlencoded');
		req.setTimeout(120000);
		if( body != null ){
			req.setBody(body);
			req.setHeader('Content-length',string.valueOf(body.length()));
		}
		HttpResponse res = new http().send(req);
	
		system.debug(res.getBody());
		return res;
	}

	public static User parseGoogleAuth(String body, User u){
		jsonParser parser = json.createParser(body);
		while ( parser.nextToken() != null ){
			if ( parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() != null && parser.getText() == 'access_token' ){
				parser.nextToken();
				u.Google_Access_Token__c = parser.getText();
			} else
			if ( parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() != null && parser.getText() == 'refresh_token' ){
				parser.nextToken();
				u.Google_Refresh_Token__c = parser.getText();
			}					
		}
		return u;
	}

	public static PageReference loginRequestPage
		(String redirectURI, String state){
			PageReference p = 
				new PageReference('https://accounts.google.com/o/oauth2/auth');
		p.getParameters().put('response_type','code');	//Determines if the Google Authorization Server returns an authorization code (code), or an opaque access token (token)
		p.getParameters().put('client_id',GOOGLE_API_CLIENT_ID);
		p.getParameters().put('redirect_uri',redirectURI);
		p.getParameters().put('approval_prompt','force');
		p.getParameters().put('scope',GOOGLE_CALENDAR_SCOPE);
		p.getParameters().put('state',state);	//This optional parameter indicates any state which may be useful to your application upon receipt of the response. The Google Authorization Server roundtrips this parameter, so your application receives the same value it sent. Possible uses include redirecting the user to the correct resource in your site, nonces, and cross-site-request-forgery mitigations.
		p.getParameters().put('access_type','offline');
		return p;
	}

	public static User obtainAccessToken(User u, String code, String redirectURL){
		PageReference p = new PageReference('http://www.replace.com');
		p.getParameters().put('client_id',GOOGLE_API_CLIENT_ID);
		p.getParameters().put('client_secret',GOOGLE_API_CLIENT_SECRET);
		p.getParameters().put('scope','');
		p.getParameters().put('redirect_uri',redirectURL);
		p.getParameters().put('grant_type','authorization_code');
		p.getParameters().put('code',code);
		String body = p.getURL();
		body = body.subStringAfter('?');
		httpResponse googleAuth = callGoogle('https://accounts.google.com/o/oauth2/token','POST',body);		
		if ( googleAuth.getStatusCode() == 200 ){
			u = parseGoogleAuth(googleAuth.getBody(), u);
		}
		else u.Google_Access_Token__c ='error';
		return u;
	}

	public static User refreshToken(User u){
		PageReference p = new PageReference('http://www.replace.com');
		p.getParameters().put('client_id',GOOGLE_API_CLIENT_ID);
		p.getParameters().put('client_secret',GOOGLE_API_CLIENT_SECRET);
		p.getParameters().put('refresh_token',u.Google_Refresh_Token__c);
		p.getParameters().put('grant_type','refresh_token');
		String body = p.getURL();
		body = body.subStringAfter('?');
		httpResponse googleAuth = callGoogle('https://accounts.google.com/o/oauth2/token','POST',body);
		if ( googleAuth.getStatusCode() == 200 ){
			u = parseGoogleAuth(googleAuth.getBody(), u);
		}
		return u; 
	}

	public class calloutWrapper{
		public String body {get;set;}
		public String endpoint {get;set;}
		public String googleCalendarEmail {get;set;}
		public String googleEventId {get;set;}
		public String method {get;set;}
		public String ownerName {get;set;}
		public Id salesforceEventId {get;set;}
		public Id salesforceOwnerId {get;set;}
		
		public calloutWrapper(Event e){
			ownerName = usermap.get(e.OwnerId).Name;
			googleCalendarEmail = usermap.get(e.ownerid).google_Email__c;
			salesforceOwnerId = e.OwnerId;
			salesforceEventId = e.Id;
			if ( string.isNotBlank(e.Google_Id__c) ){
				googleEventId = e.Google_Id__c;
			}
			body = compileBodyFromEvent(e);
		}
	}

	public static String compileBodyFromEvent(Event e){
		//we’re building a JSON body manually!
		String body = '{'+cr+' "end": {'+cr;
		if (e.isalldayevent){
			body += ' "date": "'+ e.StartDateTime.formatgmt('yyyy-MM-dd') +'"'+cr;
		}
		else {
			body += ' "dateTime": "'+ convertDateTimeToString(e.EndDateTime) +'"'+cr;
		}
		body += ' },'+cr+' "start": {'+cr;
		if (e.isalldayevent){
			body += ' "date": "'+ e.StartDateTime.formatgmt('yyyy-MM-dd') +'"'+cr;
		}
		else{
			body += ' "dateTime": "'+ convertDateTimeToString(e.StartDateTime) +'"'+cr;
		}
		body += ' },'+cr;
		if ( string.isNotBlank(e.Subject) ){
			body += ' "summary": "'+ e.Subject +'",'+cr;
		}
		if ( string.isNotBlank(e.Description) ){
			body += ' "description": "'+ e.Description.replace('\n','\\n').replace('\r','\\r') +'",'+cr;
		}
		if ( string.isNotBlank( e.Location ) ){
			body += ' "location": "'+ e.Location +'",'+cr;
		}
		//we've been blindly adding returns
		body = body.subStringBeforeLast(',');
		body += '}'+cr;
		return body;
	}

	public static void processEventList(list<Event> eventList, boolean deleting){
		//generate a map of all events by ownerid
		//we'll need this because Google only lets us work with 1 user at a time
		map<String, list<calloutWrapper>> eventsByOwnerId = wrapEventsByOwner(eventlist, deleting);

		//list to collect events for update
		List<Event> eventUpdates = new List<Event>();

		for (string userId : eventsByOwnerId.keyset()){
			//refresh user Credentials, and store in map
			userMap.put(userid,refreshToken(usermap.get(userid)));

			//send the request in one fel swoop
			httpResponse res = new http().send(buildRequest(userMap.get(userid), eventsByOwnerId.get(userid)));
			//retrieve response body for work
			String resBody = res.getBody();
			//debug the response
			system.debug(resbody);
			//what's the boundary Google is using?
			String googBoundary = resBody.subStringBefore('Content-Type:');
			system.debug(googBoundary);
			//use that boundary to split the response
			List<String> parts = resBody.split(googBoundary);
			
			//for every split part of the response by boundary
			for ( String p : parts ){
				//if this is an event response
				if ( p.contains('Content-ID: <response-') ){
					//add event to list for update with it's new Google Id
					Event e = new Event(Id=p.subStringBetween('Content-ID: <response-','>'));
					e.Google_Id__c = p.subStringBetween('"id": "','"');
					eventUpdates.add(e);
				}
			}
			//if we were inserting events.
			if (!eventUpdates.isEmpty() && !deleting) update eventUpdates;
		}
	}

	public static map<String, list<calloutWrapper>> wrapEventsByOwner(List<Event> eventList, boolean deleting){
		map<String, list<calloutWrapper>> ownerMap = new map<String, list<calloutWrapper>>();
		for ( Event e : eventList ){
			if ( e.StartDateTime != null && e.EndDateTime != null ){
				calloutWrapper w = new calloutWrapper(e);
				w.Method = (string.isnotBlank(w.googleEventId))?((deleting)?'DELETE':'PATCH'):'POST';

				if ( ownerMap.containsKey(e.OwnerId))
					ownerMap.get(e.OwnerId).add(w);
				else ownerMap.put(e.OwnerId, new list<calloutWrapper>{w});
			}
		}
		return ownerMap;
	}

	public static HttpRequest buildRequest(User u, list<calloutWrapper> eventList){
		httpRequest req = new httpRequest();
		//boundary to be used to denote individual events in our batch
		//this can be anything you like, but since this is a use case, foobar :)
		String boundary = '______________batch_foobarbaz';
		//let Google know what our boundary is so it knows when to break things up
		req.setHeader('Content-Type','multipart/mixed; boundary='+boundary);
		//add the access token as our authentication
		req.setHeader('Authorization','Bearer '+u.Google_Access_Token__c);
		req.setMethod('POST');
		//we're sending a batch request, so we have a special endpoint
		req.setEndpoint('https://www.googleapis.com/batch');
		//max timeout
		req.setTimeout(120000);
		//construct our body
		String reqBody = '';
		//for every wrapped event
		for ( calloutWrapper e : eventList ){
			//start every event with a boundary
			reqBody += '--'+boundary+cr;
			//define type
			reqBody += 'Content-Type: application/http'+cr;
			//identify with our Salesforce id	
			reqBody += 'Content-ID: <'+e.salesforceEventId+'>'+cr+cr;
			//what are we doing to this event? insert,update,delete?
			//aka post,patch,delete
			reqBody += e.Method+' ';
			//identify the calendar
			reqBody += '/calendar/v3/calendars/'+encodingUtil.urlEncode(u.google_email__c,'UTF-8');
			//add in the path for events on this calendar (static variable from documentation)
			reqBody += GOOGLE_CALENDAR_EVENTS_PATH;
			//if we're updating or deleting the Google event... we need to provide its id
			if ( string.isNotBlank(e.GoogleEventId) && (e.Method == 'PATCH' || e.Method == 'DELETE')){
				reqBody += '/'+e.googleEventId;
			}
			reqBody += cr+'Content-Type: application/json; charset=UTF-8'+cr;
			//delete requests don't need these
			if ( e.method != 'DELETE' ){
				reqBody += 'Content-Length: '+e.Body.length()+cr;
				reqBody += cr;
				reqBody += e.Body;
			}
			reqBody += cr;			
		}
		//close off our batch request with a boundary
		reqBody += '--'+boundary+'--';
		// for debugging, let's see what we've got
		system.debug(reqBody);
		//set the body
		req.setBody(reqBody);
		//be good and set required length header
		req.setHeader('Content-Length',string.valueOf(reqBody.length()));
		return req;
	}
}