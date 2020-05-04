@isTest
public with sharing class NotificationHandlerTest {

    @isTest
    public static void testDoPost(){
        Test.startTest();
            NotificationHandler.doPost('Apex Failure', 'Apex Failure Notification', 'An issue encountered while processing accounts', false);
        Test.stopTest();
    }
}