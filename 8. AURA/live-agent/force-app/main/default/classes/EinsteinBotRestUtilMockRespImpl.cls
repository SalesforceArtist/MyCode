/*
 * Author: Shantanu Srivastava
 * Date: 30/11/2018
 */
@isTest
public class EinsteinBotRestUtilMockRespImpl implements HttpCalloutMock {

    public HTTPResponse respond(HTTPRequest req) {

        System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"messages":[{"type":"Availability", "message":{"results":[{"id":"5731l0000004CEz","isAvailable":true}]}}]}');
        res.setStatusCode(200);
        return res;
    }
}