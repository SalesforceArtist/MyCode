trigger accountTrigger on Account (after insert, after update){

	if ( trigger.isAfter && trigger.isUpdate ){
		accountMethods.updateContactPhones(trigger.new, trigger.old); 
	}

}