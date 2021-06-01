public class rollup_Methods {

	//for rolling up statements to total invoiced
	public static void rollupStatementsToRentalAgreement(list<Statement__c> newlist){
		//first we need a set of Rental Agreements involved
		set<id> rentalAgreementSet = new set<id>();
		//loop through every statement and add the related rental agreement id
		for (Statement__c s : newlist) rentalAgreementSet.add(s.Rental_Agreement__c);

		//list to store our Rental_Agreement__c for update
		list<Rental_Agreement__c> rentalUpdates = new list<Rental_Agreement__c>();

		//aggregate query to sum total amount from statement
		//group by rental agreement
		for (AggregateResult ar : [select sum(Total_Amount__c) totalInvoice,rental_agreement__c from Statement__c where Rental_Agreement__c IN :rentalAgreementSet group by Rental_Agreement__c]){
			//instantiate an update record for each grouped aggregate result
			Rental_Agreement__c r = new Rental_Agreement__c(id= string.valueof(ar.get('rental_agreement__c')));
			//set value of total invoiced
			r.Total_Invoiced__c = double.valueof(ar.get('totalInvoice'));
			//add to update list
			rentalUpdates.add(r);
		}

		//if update list has records, update 
		if (!rentalUpdates.isEmpty()) update rentalUpdates;
	}

	//for rolling up payments to total payments
	//note that you can use a map or list from triggers
	//use trigger.new and trigger.newmap respectively (same for 'old')
	public static void rollupPaymentsToRentalAgreement(map<id,Payment__c> newmap){
		//since we need to navigate two objects to get to rental agreement fields
		//it is best practice to query for the data we need to ensure it is available to us
		//triggers do not automatically contain all fields if invoked from code actions
		set<id> rentalAgreementSet = new set<id>();
		for (Payment__c p : [select id, Statement__r.Rental_Agreement__c from Payment__c where id IN :newmap.keyset()]){
			rentalAgreementSet.add(p.Statement__r.Rental_Agreement__c);
		}

		//list to store our Rental_Agreement__c for update
		list<Rental_Agreement__c> rentalUpdates = new list<Rental_Agreement__c>();

		//aggregate query to sum total amount from payments
		//group by rental agreement
		for (AggregateResult ar : [select sum(Amount__c) totalPaid, Statement__r.Rental_Agreement__c ra from Payment__c where Statement__r.Rental_Agreement__c IN :rentalAgreementSet group by Statement__r.Rental_Agreement__c]){
			//instantiate an update record for each grouped aggregate result
			Rental_Agreement__c r = new Rental_Agreement__c(id= string.valueof(ar.get('ra')));
			//set value of total invoiced
			r.Total_Payments__c = double.valueof(ar.get('totalPaid'));
			//add to update list
			rentalUpdates.add(r);
		}

		//if update list has records, update 
		if (!rentalUpdates.isEmpty()) update rentalUpdates;
	}
}