public with sharing class callouts {
	
	public static string callRest_GET(){
		Http ht = new Http();
		HttpRequest req = new HttpRequest();
		req.setMethod('GET');
		req.setTimeout(120000);
		//No body for GET
		//req.setBody();
		//req.setBodyAsBlob(blob body);
		req.setEndpoint('https://packtlearninga-developer-edition.na17.force.com/services/apexrest/learnRest_Endpoint?aName=testing%20site%202');
		//We don't need any special headers
		//req.setHeader(String key, String value);
		HttpResponse res = new HttpResponse();
		res = ht.send(req);
		system.debug(res.getStatusCode());
		system.debug(res.getHeaderKeys());
		system.debug(res.getHeader('Content-Type'));
		system.debug(res.getBody());
		return res.getBody();
	}

	public static string callRest_POST(){
		string body = '{"acct": {"Name": "testing site 2","Phone": "(654) 654-6544","Website": "website.com","Type": "Prospect","Fax": "(235) 235-2356","Id": "001o0000007zh9rAAA","Industry": "Agriculture"}}';
		Http ht = new Http();
		HttpRequest req = new HttpRequest();
		req.setMethod('GET');
		req.setTimeout(120000);
		req.setBody(body);
		//Using string not blob for body
		//req.setBodyAsBlob(blob body);
		req.setEndpoint('https://packtlearninga-developer-edition.na17.force.com/services/apexrest/learnRest_Endpoint?aName=testing%20site%202');
		req.setHeader('Content-Type', 'application/json');
		HttpResponse res = new HttpResponse();
		res = ht.send(req);
		system.debug(res.getStatusCode());
		system.debug(res.getHeaderKeys());
		system.debug(res.getHeader('Content-Type'));
		system.debug(res.getBody());
		return res.getBody();
	}

	public static string callSOAP_updateAccountName(){
		string body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lear="http://soap.sforce.com/schemas/class/learnSOAP"><soapenv:Header><lear:SessionHeader><lear:sessionId>'+userInfo.getSessionId()+'</lear:sessionId></lear:SessionHeader></soapenv:Header><soapenv:Body><lear:updateAccountName><lear:acctId>001o0000007zgRf</lear:acctId><lear:newName>THE NEW NAME</lear:newName></lear:updateAccountName></soapenv:Body></soapenv:Envelope>';
		Http ht = new Http();
		HttpRequest req = new HttpRequest();
		req.setMethod('GET');
		req.setTimeout(120000);
		req.setBody(body);
		//Using string not blob for body
		//req.setBodyAsBlob(blob body);
		req.setEndpoint('https://salesforce.com/services/Soap/class/learnSOAP');
		
		req.setHeader('Content-Type', 'text/xml');
		req.setHeader('Content-Length', string.valueof(body.length()));
		req.setHeader('SOAPAction','http://schemas.xmlsoap.org/soap/envelope/');
		HttpResponse res = new HttpResponse();
		res = ht.send(req);
		system.debug(res.getStatusCode());
		system.debug(res.getHeaderKeys());
		system.debug(res.getHeader('Content-Type'));
		system.debug(res.getBody());
		return res.getBody();
	}

	/*
		//The Http Object, facilitates communication
		Http ht = new Http();

		//Http Request Object, what we will send
		HttpRequest req = new HttpRequest();
		//Http Method we will use for sending
		//Options here are POST, GET, etc.
		req.setMethod(string method);
		//Milliseconds to wait for response, max 120000)
		req.setTimeout(integer milliseconds);
		//Set body as string, if not blob
		req.setBody(string body);
		//Set body as blob, if not string
		req.setBodyAsBlob(blob body);
		//Set endpoint, where are we sending request
		req.setEndpoint(String endpoint);
		//Repeat for all headers
			//Be careful with this one, some services are
			//very picky and will not accept your request
			//without headers like Content-Length
			//or Content-Type
		req.setHeader(String key, String value);

		//Http Response Object, houses the response
		HttpResponse res = new HttpResponse();
		//Set the response to result of sending request
		res = ht.send(req);
		//Outputs response status code to console
		system.debug(res.getStatusCode());
		//Outputs all response header keys to console
		system.debug(res.getHeaderKeys());
		//Use to output specific header key to console
		system.debug(res.getHeader(string key));
		//Output the body of response to console
		system.debug(res.getBody());
	*/
}