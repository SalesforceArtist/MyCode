public class accountMethods {
	
	static Boolean hasExecutedAlready = false;

	public static void afterUpdate(List<Account> newList){
		if ( hasExecutedAlready == false ){
			//Hundreds of lines of complex logic
			hasExecutedAlready = true;
			update newList;	
		}
	}
}