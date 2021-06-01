trigger payment_Trigger on Payment__c (after insert, after update) {

	if(trigger.isAfter && trigger.isInsert || trigger.isUpdate)
		rollup_Methods.rollupPaymentsToRentalAgreement(trigger.newmap);
}