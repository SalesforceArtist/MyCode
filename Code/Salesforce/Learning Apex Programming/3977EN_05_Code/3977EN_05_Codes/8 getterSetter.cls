
	//First declare your variable
	Account myAccount;
	
	//Here is the getter
	public Account getMyAccount(){
		//We don’t want to return a null value
		if ( myAccount == null ){
			myAccount = new Account();
		}
		return myAccount;
	}
	
	//Here is the setter
	public void setMyAccount(Account a){
		myAccount = a;
	}

