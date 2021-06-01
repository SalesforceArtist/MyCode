global class batch_GoogleCalendar_Sync implements Database.Batchable<sObject>, Database.AllowsCallouts{
	
	global final string queryString;
	global final boolean deleting;
	global final dateTime lastSync;
	global final dateTime lastDelete;

	global batch_GoogleCalendar_Sync(boolean del) {
		GoogleCalendar__c gcBatchSync = GoogleCalendar__c.getInstance('BatchSync');
		lastSync = gcBatchSync.lastSync__c;
		lastDelete = gcBatchSync.lastDelete__c;
		if (lastSync==null) lastSync = dateTime.newinstance(1970,1,1);
		if (lastDelete==null) lastDelete = dateTime.newinstance(1970,1,1);
		
		deleting = del;
		
		if (string.isBlank(queryString)){
			string temp = 'Select Subject, StartDateTime, OwnerId, Location, IsAllDayEvent, Id, EndDateTime, DurationInMinutes, Description, ActivityDateTime, ActivityDate, google_id__c From Event';
			
			if (deleting){
				temp += ' where lastModifiedDate > :lastDelete AND isDeleted = true';
				temp += ' ALL ROWS';
			}
			else temp += ' where lastModifiedDate > :lastSync';
		
			if (test.isRunningTest()) temp += ' limit 1';
		
			queryString = temp;
			system.debug(queryString);
		}
		if(deleting) gcBatchSync.lastDelete__c = system.now();
		else gcBatchSync.lastSync__c = system.now();

		update gcBatchSync;
	}

	global Database.QueryLocator start(Database.BatchableContext bc){
		return Database.getQueryLocator(queryString);
	}

	global void execute(Database.BatchableContext bc, list<Event> scope){
		googleCalendar_API.processEventList(scope, deleting);
	}

	global void finish(Database.BatchableContext bc){
		GoogleCalendar__c gcBatchSync = GoogleCalendar__c.getInstance('BatchSync');
		decimal delayMin = gcBatchSync.frequency_min__c;
		if (delayMin == null || delayMin < 0) delayMin = 0;
 		if(deleting) startBatchDelay(false,integer.valueof(delayMin));
		else startBatch(true);
	}

	global static void startBatch(boolean d){
		batch_GoogleCalendar_Sync job = new batch_GoogleCalendar_Sync(d);
		database.executeBatch(job,50);
	}

	global static void startBatchDelay(boolean d, integer min){
		batch_GoogleCalendar_Sync job = new batch_GoogleCalendar_Sync(d);
		system.scheduleBatch(job,'GoogleCalendarSync-'+((d)?'del':'upsert'),min,50);
	}
}