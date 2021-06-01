trigger accountTrigger on Account (after update) {
	accountMethods.afterUpdateMethod(trigger.new);
}