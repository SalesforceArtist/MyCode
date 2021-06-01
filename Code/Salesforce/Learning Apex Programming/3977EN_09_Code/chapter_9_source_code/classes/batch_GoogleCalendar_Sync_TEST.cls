@isTest
private class batch_GoogleCalendar_Sync_TEST {

	static testmethod void batch_GoogleCalendar_Sync_Delete_TEST() {
		Event e = new Event();
		e.subject = 'test';
		e.startDateTime = system.now();
		e.endDateTime = system.now().addhours(1);
		e.description = 'test';
		insert e;
		delete e;

		GoogleCalendar__c gcBatchSync = new GoogleCalendar__c();
		gcBatchSync.name = 'BatchSync';
		gcBatchSync.lastSync__c = system.now().addhours(-1);
		gcBatchSync.lastDelete__c = system.now().addhours(-1);
		insert gcBatchSync;

		test.startTest();
			Test.setMock(HttpCalloutMock.class, new mock_GoogleService());
			batch_GoogleCalendar_Sync.startBatchDelay(true, 1);
		test.stopTest();
	}
}
