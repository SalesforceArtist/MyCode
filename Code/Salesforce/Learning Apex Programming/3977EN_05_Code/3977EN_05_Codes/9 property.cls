//Declare your property with logic and you’re done
Account myAccount {
	get{
		if ( myAccount == null ){
			myAccount = new Account();
		}
	}
	set;
}
