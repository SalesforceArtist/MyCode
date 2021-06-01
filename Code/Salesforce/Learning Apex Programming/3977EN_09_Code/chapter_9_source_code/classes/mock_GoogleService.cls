@isTest
global class mock_GoogleService implements HttpCalloutMock{

	global HttpResponse respond(HttpRequest req){
		system.debug(req);
		
		HttpResponse res = new HttpResponse();
		res.setStatusCode(200);
		res.setStatus('Ok');

		string response;
		//retrieve endpoint being called to determine response
		string endpoint = req.getEndpoint();
		//handle calendar request
		if (endpoint == 'https://www.googleapis.com/batch'){
			response = '--batch_WwEGYD6Iy8A_ABl0yltfmbo\nContent-Type: application/http\nContent-ID: <response-00Uo0000001JynUEAS>\n\nHTTP/1.1 200 OK\nETag: "2826236657198000"\nContent-Type: application/json; charset=UTF-8\nDate: Sun, 12 Oct 2014 12:52:14 GMT\nExpires: Sun, 12 Oct 2014 12:52:14 GMT\nCache-Control: private, max-age=0\nContent-Length: 780\n\n{\n "kind": "calendar#event",\n "etag": "\"2826236657198000\"",\n "id": "1u5fli71vjtmv4tqc5d61lhdu4",\n "status": "confirmed",\n "htmlLink": "https://www.google.com/calendar/event?eid=MXU1ZmxpNzF2anRtdjR0cWM1ZDYxbGhkdTQgdGVkd2ljaGVyc2tpQG0",\n "created": "2014-10-12T12:52:08.000Z",\n "updated": "2014-10-12T12:52:08.599Z",\n "summary": "test",\n "creator": {\n  "email": "test@test.com",\n  "displayName": "Michael Wicherski",\n  "self": true\n },\n "organizer": {\n  "email": "test@test.com",\n  "displayName": "Michael Wicherski",\n  "self": true\n },\n "start": {\n  "dateTime": "2014-10-12T06:00:00-07:00"\n },\n "end": {\n  "dateTime": "2014-10-12T07:00:00-07:00"\n },\n "iCalUID": "1u5fli71vjtmv4tqc5d61lhdu4@google.com",\n "sequence": 0,\n "reminders": {\n  "useDefault": true\n }\n}\n\n--batch_WwEGYD6Iy8A_ABl0yltfmbo--\n';
		}
		//handle auth callout
		else {
			response = '{"access_token" : "nAAvQIWYm01SZl3fLKII574i9e-62VV2qCrJQ6TYRTcM3yoJfQxn2LTE","token_type" : "Bearer","expires_in" : 3600}';
		}
		res.setBody(response); 

		return res;
	}
}