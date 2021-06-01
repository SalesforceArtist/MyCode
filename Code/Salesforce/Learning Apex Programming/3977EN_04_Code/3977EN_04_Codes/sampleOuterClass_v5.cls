public with sharing class sampleOuterClass {

	public class stateWrapper {
		public String stateName;
		public Integer contactCount;
		public Integer accountCount;
		
		//Default constructor for innerClass
		public stateWrapper(
			String stateName, 
			Integer contactCount, 
			Integer accountCount
		){
			this.stateName = stateName;
			this.contactCount = contactCount;
			if ( contactCount == null ){
				contactcount = 0;
			}
			this.accountCount = accountCount;
			if ( accountCount == null ){
				accountCount = 0;
			}
			//the above this keyword denotes that we are talking about
			//the variables outside the constructor and not
			//the input parameters by the same name.
		}
	}

	public static Map<String,stateWrapper> calculateMetrics(){
		Map<String,stateWrapper> stateMap = 
			new Map<String,stateWrapper>();
		for ( AggregateResult ar : [	
			Select Count(id) cnt, BillingState state
			from Account 
			where BillingState != null 
			group by BillingState
		]){
			stateWrapper sw = new stateWrapper(
				(string)ar.get('state'),
				(integer)ar.get('cnt'),
				null
			);
			stateMap.put(sw.stateName,sw);
		}
		for ( AggregateResult ar : [	
			Select Count(id) cnt, MailingState state
			from Contact 
			where MailingState != null 
			group by MailingState
		]){
			stateWrapper sw = new stateWrapper(
				(string)ar.get('state'),
				null,
				null
			);
			if ( stateMap.containsKey(sw.stateName) ){
				sw = stateMap.get(sw.stateName);
			}
			sw.contactCount = (integer)ar.get('cnt');
			stateMap.put(sw.stateName,sw);
		}
		return stateMap;
	}
}