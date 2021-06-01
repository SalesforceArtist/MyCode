@isTest
private class rollup_Methods_TEST {
	
	static Account acct = test_helperMethods.insert_TestAccount();
	static Contact cont = test_helperMethods.insert_TestContact(acct.id);
	static Property__c prop = test_helperMethods.insert_TestProperty(cont.id);
	static Rental_Unit__c unit = test_helperMethods.insert_TestRentalUnit(prop.id);

	static testmethod void rollupStatementsToRentalAgreement_test(){
		Rental_Agreement__c agree = test_helperMethods.insert_TestRentalAgreement(unit.id, cont.id, 100, 100);
		
		test.startTest();
			Statement__c statement = test_helperMethods.generate_TestStatement(agree.id, 100);
			insert statement;
			agree = [select id, Total_Invoiced__c from Rental_Agreement__c where id = :agree.id];
			system.assert(agree.Total_Invoiced__c == 100);

			statement.Amount__c = 200;
			update statement;

			agree = [select id, Total_Invoiced__c from Rental_Agreement__c where id = :agree.id];
			system.assert(agree.Total_Invoiced__c == 200);
		test.stopTest();
	}

	static testmethod void rollupPaymentsToRentalAgreement_test(){
		Rental_Agreement__c agree = test_helperMethods.insert_TestRentalAgreement(unit.id, cont.id, 100, 100);
		Statement__c statement = test_helperMethods.generate_TestStatement(agree.id, 100);
		insert statement;

		test.startTest();
			Payment__c pay = test_helperMethods.generate_TestPayment(statement.id, 50);
			insert pay;
			agree = [select id, Total_Payments__c from Rental_Agreement__c where id = :agree.id];
			system.assert(agree.Total_Payments__c == 50);

			pay.Amount__c = 100;
			update pay;
			agree = [select id, Total_Payments__c from Rental_Agreement__c where id = :agree.id];
			system.assert(agree.Total_Payments__c == 100);						
		test.stopTest();
	}
}