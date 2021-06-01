Anoymous code

//user navigates to album which is not yet public
List<MUSIC_LIBRARY__c> lstSongs = [SELECT ID FROM MUSIC_LIBRARY__c WHERE Album__c = 'Chuck Berry Is on Top'];

List<Music_Notification__c> lstSubscriberlist = new List<Music_Notification__c>();
for(MUSIC_LIBRARY__c song : lstSongs)
{
	Music_Notification__c notify = new Music_Notification__c(Music_Library__c = song.Id, 
		Email_Address__c = 'abc@xyz.com', Subscribe__c = true);
}

//user subscribes to album
insert lstSubscriberlist;

for(MUSIC_LIBRARY__c song : lstSongs)
{
	//make album public
	song.is_Public__c = true;
}

//changes made to database
update lstSongs;

//trigger will execute notifyObservers() of MusicSubject
//notify() of MusicObserver to mark sendEmail field in notification record
//changing field "Send Email" will invoke WF rule for sending email