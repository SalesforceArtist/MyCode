trigger statement_Trigger on Statement__c (after insert, after update) {
	if(trigger.isAfter && trigger.isInsert || trigger.isUpdate)
		rollup_Methods.rollupStatementsToRentalAgreement(trigger.new);
}