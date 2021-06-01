public class test_helperMethods {
	
	public static Account generate_TestAccount(){
		Account a = new Account();
		a.name = 'TestAccount';
		return a;
	}

	public static Account insert_TestAccount(){
		Account a = generate_TestAccount();
		insert a;
		return a;
	}

	public static Contact generate_TestContact(id accountid){
		Contact c = new Contact();
		c.firstname ='testfirst';
		c.lastname = 'testlast';
		c.email = 'test@test.com';
		c.mailingstreet = '123 any street';
		c.mailingcity = 'testcity';
		c.mailingstate = 'CA';
		c.mailingpostalcode = '12345';
		if (accountid!=null){
			c.AccountId = accountid;
		}
		return c;
	}

	public static Contact insert_TestContact(id accountid){
		Contact c = generate_TestContact(accountid);
		insert c;
		return c;
	}

	public static Property__c generate_TestProperty(id ownerid){
		Property__c p = new Property__c();
		p.owner__c = ownerid;
		p.Year_Built__c = ''+system.today().year();
		p.Physical_Street__c = '123 any street';
		p.Physical_City__c = 'testcity';
		p.Physical_State__c = 'CA';
		p.Physical_Postal_Code__c ='12345';
		return p;
	}

	public static Property__c insert_TestProperty(id ownerid){
		Property__c p = generate_TestProperty(ownerid);
		insert p;
		return p;
	}

	public static Rental_Unit__c generate_TestRentalUnit(id propertyId){
		Rental_Unit__c r = new Rental_Unit__c();
		r.Property__c = propertyId;
		r.Number_of_Bedrooms__c = 2;
		r.Number_of_Bathrooms__c = 2;
		return r;
	}

	public static Rental_Unit__c insert_TestRentalUnit(id propertyid){
		Rental_Unit__c r = generate_TestRentalUnit(propertyid);
		insert r;
		return r;
	}

	public static Rental_Agreement__c generate_TestRentalAgreement(id rentalUnitId, id renterId, decimal rentAmt, decimal depAmt){
		Rental_Agreement__c r = new Rental_Agreement__c();
		r.Rental_Unit__c = rentalUnitId;
		r.Renter__c = renterId;
		r.Rental_Amount__c = rentAmt;
		r.Deposit__c = depAmt;
		return r;
	}

	public static Rental_Agreement__c insert_TestRentalAgreement(id rentalUnitId, id renterId, decimal rentAmt, decimal depAmt){
		Rental_Agreement__c r = generate_TestRentalAgreement(rentalUnitId, renterId, rentAmt, depAmt);
		insert r;
		return r;
	}

	public static Statement__c generate_TestStatement(id agreementId, decimal amt){
		Statement__c s = new Statement__c();
		s.Rental_Agreement__c = agreementId;
		s.Amount__c = amt;
		s.Statement_Date__c = system.today();
		s.status__c = 'Issued';
		return s;
	}

	public static Statement__c insert_TestStatement(id agreementId, decimal amt){
		Statement__c s = generate_TestStatement(agreementId, amt);
		insert s;
		return s;
	}

	public static Payment__c generate_TestPayment(id statementid, decimal amount){
		Payment__c p = new Payment__c();
		p.Statement__c = statementid;
		p.amount__c = amount;
		p.Payment_Date__c = system.now();
		return p;
	}

	public static Payment__c insert_TestPayment(id statementId, decimal amount){
		Payment__c p = generate_TestPayment(statementid, amount);
		insert p;
		return p;
	}
}