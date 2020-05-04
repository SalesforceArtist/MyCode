/*
 * Author: Shantanu Srivastava
 * Date: 30/11/2018
 */
 public with sharing class EinsteinBotRestUtil {

 /**
   * @description	-	Gets Live Agent Availability
   */
    public static Boolean getButtonAvailabilityForTransfer(String sBotOrgId, String sBotDeploymentId, String sBotTransferButtonId) {

        Boolean isAvailable = false;
        String sOrgId = sBotOrgId.substring(0, 15);
        String sButtonId = sBotTransferButtonId.substring(0, 15);
        String sDeploymentId = sBotDeploymentId.substring(0, 15);
        String sPath = 'callout:LiveAgent_REST/chat/rest/Visitor/Availability?Availability.ids=['+sButtonId+']&deployment_id='+sDeploymentId+'&org_id='+sOrgId;
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(sPath);
        request.setMethod('GET');
        request.setHeader('X-LIVEAGENT-API-VERSION', '44');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            JSONParser parser = JSON.createParser(response.getBody()); while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&
                    (parser.getText() == 'isAvailable')) {
                        // Get the value.
                        parser.nextToken();
                        isAvailable = parser.getBooleanValue();
                        if (isAvailable == null) isAvailable = false;
                    }
                } 
    }
        return isAvailable;
    }
}