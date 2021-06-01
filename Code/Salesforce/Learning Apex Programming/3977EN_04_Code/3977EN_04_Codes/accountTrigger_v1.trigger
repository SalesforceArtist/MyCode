trigger accountTrigger on Account (after insert, after update) {

	//Use the Boolean attributes to quickly determine where we are in the order of execution and what operation occurred.
	if ( trigger.isAfter && trigger.isInsert ){
		for ( Account a : trigger.new ){
			if ( a.Phone != null ){
				system.debug(a.Phone);
			}
		}
	}
	if ( trigger.isAfter && trigger.isUpdate ){
		for ( Integer i=0;i<trigger.size;i++ ){
			if ( trigger.new[i].phone != trigger.old[i].phone ){
				system.debug(
					trigger.new[i].phone +'!='+ trigger.old[i].phone 
				);
			}
		}
	}

}