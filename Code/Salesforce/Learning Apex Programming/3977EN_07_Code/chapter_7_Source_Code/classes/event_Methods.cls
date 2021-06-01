public with sharing class event_Methods {
	
	public static void afterUpsert(list<Event> newlist){
		if (!system.isFuture()) processLater(JSON.serialize(newlist), false);
	}

	public static void afterDelete(list<Event> oldlist){
		if (!system.isFuture()) processLater(JSON.serialize(oldlist), true);
	}	

	@Future(callout=true)
	public static void processLater(string serializedEvents, boolean deleting){
		list<Event> eventsList = (list<Event>)JSON.deserialize(serializedEvents,list<Event>.class);
		googleCalendar_API.processEventList(eventsList, deleting);
	}
}