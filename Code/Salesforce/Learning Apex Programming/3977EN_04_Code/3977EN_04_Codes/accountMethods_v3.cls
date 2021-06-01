public with sharing class accountMethods {

	public static void updateContactPhones(
		List<Account> priorVersions, 
		List<Account> updatedVersions
	){
		Set<Id> modifiedAccounts_Ids = new Set<Id>();
		for ( Integer i=0;i<updatedVersions.size();i++ ){
			if ( updatedVersions[i].Phone != priorVersions[i].Phone ){
				modifiedAccounts_Ids.add(updatedVersions[i].Id);
			}
		}
		if ( modifiedAccounts_Ids.size() > 0 ){
			List<Contact> contactQuery = [
				Select Id, Phone, AccountId, Account.Phone 
				from Contact
				where AccountId in :modifiedAccounts_Ids 
				limit :( 
					limits.getLimitQueryRows()-limits.getQueryRows() 
				)
			];
			List<Contact> contactUpdates = new List<Contact>();
			for ( Integer i=0;i<contactQuery.size();i++ ){
				if ( 
					contactQuery[i].Phone != contactQuery[i].Account.Phone && 
					contactUpdates.size() < limits.getLimitDMLRows()
				){	
					contactUpdates.add(contactQuery[i]);
				} else
				if (
					contactQuery[i].Phone != contactQuery[i].Account.Phone &&
					contactUpdates.size() >= limits.getLimitDMLRows()
				){
					Id batchProcessId = Database.ExecuteBatch(contactBatch);
				}
			}
		}
	}
}