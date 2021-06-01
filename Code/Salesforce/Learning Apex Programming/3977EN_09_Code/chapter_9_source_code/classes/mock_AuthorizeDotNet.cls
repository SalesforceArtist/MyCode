@isTest
global class mock_AuthorizeDotNet implements HttpCalloutMock{

	global HttpResponse respond(HttpRequest req){
		system.debug(req);
		
		HttpResponse res = new HttpResponse();
		res.setStatusCode(200);
		res.setStatus('Ok');

		string response = '1;1;1;This transaction has been approved.;DMPWBZ;Y;2196294662;;Transaction: test;10.00;CC;auth_capture;;first;last;;street;city;state;billzip;;;;;;;;;;;;;;;;;;449B10456AF4D3B815F828D3E82185F5;P;2;;;;;;;;;;;XXXX0002;American Express;;;;;;;;;;;;;;;;;';
		
		res.setBody(response); 

		return res;
	}
}