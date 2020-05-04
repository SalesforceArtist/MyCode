/*
** Class to handle notifications from third party integrations
** or from any apex classes to publish notifications to appropriate
** users depending on the mappings in NotificationUserMapping__mdt
*/
@RestResource(urlMapping='/send/notifications')
global with sharing class NotificationHandler {

    //static variable to get all the user mappings with modules
    static Map<String, NotificationUserMapping__mdt> notificationMappings {
        get {
            Map<String, NotificationUserMapping__mdt> mappings = new Map<String, NotificationUserMapping__mdt>();
            if(notificationMappings == null){
                for(NotificationUserMapping__mdt mapping : [SELECT Name__c, Module__c, Type__c 
                                                                FROM NotificationUserMapping__mdt]){
                    mappings.put(mapping.Module__c, mapping);   
                }
                return mappings;
            }else{
                return notificationMappings;
            }
        }
        set;
    }

    /*
    ** Post method to capture payload from request and process them to publish events
    */
    @HttpPost
    global static void doPost(String moduleName, String title, String message, Boolean isSuccess) {
        List<Notification__e> notifications = new List<Notification__e>();
        List<User> usrs;

        //check for mappings and find appropriate users
        if(notificationMappings.containsKey(moduleName)){
            NotificationUserMapping__mdt mapping = notificationMappings.get(moduleName);
            if(mapping.Type__c.equalsIgnoreCase('User')){
                usrs = [SELECT Id FROM User 
                            WHERE Name =: mapping.Name__c];
            }else if (mapping.Type__c.equalsIgnoreCase('Group') || mapping.Type__c.equalsIgnoreCase('Queue')){
                usrs = [SELECT Id FROM User 
                            WHERE Id IN (SELECT UserOrGroupId FROM GroupMember 
                                            WHERE Group.DeveloperName =: mapping.Name__c)];
            }

            if(!usrs.isEmpty()){
                //prepare notifications of each individual user
                for(User usr : usrs){
                    notifications.add(new Notification__e(Title__c = title, Message__c = message, IsError__c = !isSuccess, User__c = usr.Id));
                }

                // Call method to publish events
                List<Database.SaveResult> results = EventBus.publish(notifications);

                // Inspect publishing result for each event
                for (Database.SaveResult sr : results) {
                    if (sr.isSuccess()) {
                        System.debug('Successfully published event.');
                    } else {
                        for(Database.Error err : sr.getErrors()) {
                            System.debug('Error returned: ' +
                                        err.getStatusCode() +
                                        ' - ' +
                                        err.getMessage());
                        }
                    }       
                }
            }
        }
    }
}