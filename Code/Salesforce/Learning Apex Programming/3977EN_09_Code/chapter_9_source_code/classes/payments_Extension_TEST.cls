@isTest
private class payments_Extension_TEST {
	//declare all static data
	static Account acct = test_helperMethods.insert_TestAccount();
	static Contact cont = test_helperMethods.insert_TestContact(acct.id);
	static Property__c prop = test_helperMethods.insert_TestProperty(cont.id);
	static Rental_Unit__c unit = test_helperMethods.insert_TestRentalUnit(prop.id);
	static Rental_Agreement__c agree = test_helperMethods.insert_TestRentalAgreement(unit.id, cont.id, 100, 100);
	static Statement__c statement = test_helperMethods.insert_TestStatement(agree.id, 100);

	//test system administrator credit card payments
	static testmethod void payments_Extension_Credit_TEST(){
		//start the test and separate DML flow
		test.StartTest();
			//set our mock class for callouts
			Test.setMock(HttpCalloutMock.class, new mock_AuthorizeDotNet());

			//isntantiate the standard controller for our statement
			ApexPages.StandardController scon = new ApexPages.StandardController(statement);
			//instantiate the extension based on standard controller
			payments_Extension ext = new payments_Extension(scon);

			//test the validate method, without filling in any fields
			ext.validateFields('Credit Card');

			//mimic user input
			ext.thisPayment = fillPaymentFields(ext.thisPayment, 'Credit Card');
			//save payment
			ext.savePayment();
		//stoptest
		test.StopTest();
	}

	//test guest user credit card payments
	static testmethod void payments_Extension_Credit_GUEST_TEST(){
		//get the site guest user profile
		Profile p = [SELECT Id FROM Profile WHERE Name='LearningApex Profile']; 
      
      	//create a guestUser with the site guest user profile
		User guestUser = new User(Alias = 'guest', Email='guestuser@testorg.com', 
					      EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
					      LocaleSidKey='en_US', ProfileId = p.Id, 
					      TimeZoneSidKey='America/Los_Angeles', UserName='guestuser@testorg.com');
		//set running user as our guest user
		system.runAs(guestUser){
			//start the test
			test.StartTest();
				//set our mock class for callouts	
				Test.setMock(HttpCalloutMock.class, new mock_AuthorizeDotNet());
				//isntantiate the standard controller for our statement
				ApexPages.StandardController scon = new ApexPages.StandardController(statement);
				//instantiate the extension based on standard controller
				payments_Extension ext = new payments_Extension(scon);

				//test the validate method, without filling in any fields
				ext.validateFields('Credit Card');

				//mimic user input
				ext.thisPayment = fillPaymentFields(ext.thisPayment, 'Credit Card');
				//save payment
				ext.savePayment();
			//stoptest				
			test.StopTest();
		}
	}

	//test getters
	static testmethod void payments_Extension_Getters_Test(){
		ApexPages.StandardController scon = new ApexPages.StandardController(statement);
		payments_Extension ext = new payments_Extension(scon);

		//test getters
		ext.getIsGuest();
		ext.getExpirationYears();
		ext.getPaymentRecordTypes();
		
		//although not explicitly used by this extension
		//and therefore not necessary for the test
		//the following demonstrates how to set
		//a page for the current test and how to
		//assign paramaters to the page, enabling the
		//apexpages.currentpage().getparameters() call
		//from the test.
		PageReference p = Page.statement_payment;
		p.getParameters().put('param','value');
		Test.setCurrentPage(p);
	}

	//utility method to populate the payment fields in extension
	static Payment__c fillPaymentFields(Payment__c thisPayment, string paymentMethod){
		thisPayment.Billing_Name__c = 'test';
		thisPayment.Billing_Street__c = 'test';
		thisPayment.Billing_City__c = 'test';
		thisPayment.Billing_State__c = 'ca';
		thisPayment.Billing_Postal_Code__c = '12345';
		thisPayment.recordtypeid = [select id from RecordType where sobjecttype='Payment__c' and name =:paymentMethod].id;

		if (paymentMethod  == 'Check'){
			thisPayment.Check_Account_Number__c = '1234567890';
			thisPayment.Check_Routing_Number__c = '1234567890';
		}
		//credit card specific fields
		else if (paymentMethod == 'Credit Card'){
			thisPayment.Credit_Card_Number__c = '4111111111111111';
			thisPayment.Credit_Card_Expiration_Month__c = '01';
			thisPayment.Credit_Card_Expiration_Year__c = ''+system.today().addyears(1).year();
			thisPayment.Credit_Card_Security_Code__c = '123';
		}		

		return thisPayment;
	}
}