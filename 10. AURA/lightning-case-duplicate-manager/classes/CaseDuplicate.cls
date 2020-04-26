/***********************************************************************
Class			: CaseDuplicate
Author         	: Shantanu 
Created Date   	: 08/28/2018
Description    	: Apex side handling of CaseMatchComponentCon class
************************************************************************/
public with sharing class CaseDuplicate implements IDuplicate{

	public CaseDuplicate() {
		
	}
	public static Map<String, Integer> levenshteinDistanceFieldMap = new Map<String, Integer>(); //Map to store field api name and integer value of Levenshtein Distance Threshold
	
	/**
	* @description		-	Interface implemented method - Gets a list of matching cases based upon match criteria set in CMDT settings
	* @param caseRec	-	Case record being viewed
	* @return			-	sObject List of matching Cases
	*/
	public List<sObject> handle(sObject caseRec){

		try{
			//Get the initial list from database. Use this list to find matching cases based upon Levenshtein Distance Threshold
			List<sObject> initialMatchList = Database.query(getQueryString(getMatchingRules(), (Case)(caseRec)));
			return getFinlaList(initialMatchList, (Case)(caseRec));
		}
		catch(Exception ex){
			System.debug('>> Exception in handle : ' + ex);
			return null; 	
		}
	}

	/**
	* @description				-	Gets the final case list after all business applied matching criteria have been operated upon
	* @param initialMatchList	-	List of cases matched at first step
	* @param caseRec			-	Case record being viewed	
	* @return
	*/
	public List<sObject> getFinlaList(List<sObject> initialMatchList, Case caseRec){

		try{
			List<sObject> finalMatchList = new List<sObject>();
			for(sObject sObjectRecord : initialMatchList){
				for(String fieldName : levenshteinDistanceFieldMap.keySet()){
					Integer lDistance = getLevenshteinDistance(String.valueOf(caseRec.get(fieldName)), String.valueOf(sObjectRecord.get(fieldName)));
					if(lDistance <= levenshteinDistanceFieldMap.get(fieldName) && !finalMatchList.contains(sObjectRecord)){
						finalMatchList.add(sObjectRecord);
					}
				}
			}
			return finalMatchList;
		}
		catch(Exception ex){
			System.debug('>> Exception in getFinlaList : ' + ex);
			return null; 	
		}
	}
	
	/**
	* @description	-	Returns the Levenshtein distance between the current String and the specified String.
	* @param case1	-	field value of the case being viewed 
	* @param case2	-	field value of mathcing case record
	* @return		-	The Levenshtein distance is the number of changes needed to change one String into another. Each change is a single character modification (deletion, insertion or substitution).
	*/
	public Integer getLevenshteinDistance(String case1, String case2){
		
		try{
			return case1.getLevenshteinDistance(case2);
		}
		catch(Exception ex){
			System.debug('>> Exception in getLevenshteinDistance : ' + ex);
			return null; 	
		}
	}

	/**
	* @description	-	Gets a list of Active matching rules from the Custom Metadata Type for the Object in consideration
	* @return		-	List<Record_Match_Rule__mdt>
	*/
	public List<Record_Match_Rule__mdt> getMatchingRules(){
		try{
			List<Record_Match_Rule__mdt> caseMatchRules = [SELECT MasterLabel, Matching_Condition_Regex__c, Matching_Criteria__c, Contains_Text__c,
																	Object_Field__c, Object_Name__c, Levenshtein_Distance__c, Exclusion_Rule__c 
																	FROM Record_Match_Rule__mdt
																		WHERE Object_Name__c = 'Case' AND Active__c = true AND Automation_Lightning__c = false];
			return caseMatchRules; 	
		}	
		catch(Exception ex){
			System.debug('>> Exception in getMatchingRules : ' + ex);
			return null; 	
		}								
	}

	/**
	* @description				-	Generates the Query to be used to get first stage matching case list
	* @param caseMatchRules		-	list of Active matching rules from the Custom Metadata Type
	* @param caseRec			-	Case record being viewed	
	* @return
	*/
	public static String getQueryString(List<Record_Match_Rule__mdt> caseMatchRules, Case caseRec) {
		
		try{
			//Initiate a default querystring for match cases
			String query = 'SELECT Id, Is_Master__c, Subject, Exclusion_Case_List__c';
			List<CaseMatchComponentCon.FieldWrapper> caseFs = CaseMatchComponentCon.getColumns('Case_Matches', 'Case');

			//Add all fields referred in the Field Set
			if(!caseFs.isEmpty()){
				for(CaseMatchComponentCon.FieldWrapper caseFsRec : caseFs){
					query += ', ' + caseFsRec.APIName;
				}
			}
			//Get matching rule count
			Integer matchRuleCount = caseMatchRules.size();
			//Add all fields used in mathcing rules
			if(matchRuleCount > 0){
				for(Record_Match_Rule__mdt matchRule : caseMatchRules){
					if(!query.contains(matchRule.Object_Field__c))
						query += ', ' + matchRule.Object_Field__c;
				}
			}
			query += ' FROM Case';
			//Add where clause conditions for all matching rules
			if(matchRuleCount > 0){
				query += ' WHERE ';
				for(Record_Match_Rule__mdt matchRule : caseMatchRules){
					//Like is a special case in which where clause will not be added
					if(matchRule.Matching_Criteria__c == 'Like'){
						if(matchRule.Levenshtein_Distance__c == null)
							levenshteinDistanceFieldMap.put(matchRule.Object_Field__c, 5);
						else{
							levenshteinDistanceFieldMap.put(matchRule.Object_Field__c, Integer.valueOf(matchRule.Levenshtein_Distance__c));
						}
					}
					//Set where clause condtions for other rules - Equals, Contains
					else{
						query += setWhereClause(matchRule.Object_Field__c, matchRule.Matching_Criteria__c, (String)caseRec.get(matchRule.Object_Field__c), matchRule.Contains_Text__c, matchRule.Exclusion_Rule__c);
						if(matchRuleCount > 1) {
							query = query + ' AND ';
							matchRuleCount = matchRuleCount - 1;
						}
					}
				}
				System.debug('>> levenshteinDistanceFieldMap : ' + levenshteinDistanceFieldMap);
			}
			//Ignore the case been viewed on detail page
			if(query.contains('AND')){
				query += ' Id != ' + '\'' + caseRec.Id + '\'';
			}
			else{
				query += ' AND Id != ' + '\'' + caseRec.Id + '\'';
			}
			//Ignore the case matches already excluded for this case
			if(!String.isEmpty(caseRec.Exclusion_Case_List__c)){
				query += ' AND Id NOT IN (' + caseRec.Exclusion_Case_List__c + ')';
			}
			query += '  ORDER BY Is_Master__c DESC, CreatedDate DESC LIMIT 50000';
			System.debug('>> query : ' + query);
			return query;
		}	
		catch(Exception ex){
			System.debug('>> Exception in getQueryString : ' + ex);
			return null; 	
		}
	}

	/**
	* @description				-	Generates the WHERE clause condition for a field 
	* @param fieldName			-	Field Api Name 
	* @param clause				-	Matching Criteria value 
	* @param value				-	Field value
	* @param containsText		-	text value that needs to be used with Like Operator
	* @param exclusionRule		-	If the matching rule is to be used to exclude records
	* @return					-	String part of query to be used in WHERE Clause
	*/
	public static String setWhereClause(String fieldName, String clause, String value, String containsText, Boolean exclusionRule) {
		
		try{
			String subWhereClauseString = '';

			if(String.isNotBlank(value) && value.contains('\''))
                value = String.escapeSingleQuotes(value);
			if(String.isNotBlank(containsText) && containsText.contains('\''))
                containsText = String.escapeSingleQuotes(containsText);
            
			if(clause == 'Equals'){
				if(!String.isBlank(containsText))
					value = containsText;
				if(exclusionRule)
					subWhereClauseString += fieldName + ' !=\'';
				else
					subWhereClauseString += fieldName + ' =\'';

				subWhereClauseString += value + '\'';
			}
			if(clause == 'Contains'){
				if(exclusionRule)
					subWhereClauseString += '(NOT ' + fieldName + ' LIKE \'%' + containsText + + '%\')';
				else
				subWhereClauseString += fieldName + ' LIKE \'%' + containsText + '%\'';
			}
			return subWhereClauseString;
		}	
		catch(Exception ex){
			System.debug('>> Exception in setWhereClause : ' + ex);
			return null; 	
		}
	}

	/**
	* @description			-	Case Merge Functionality - converts the case into screened case and transfers the emails and attachments to the parent case
	* @param masterCase		-	Case to be merged with(master)
	* @param mergeCase		-	Case that needs to be merged and converted into screened case
	* @return				-	Boolean(true/false)
	*/
	public static Boolean handleCaseMergeUtil(Case masterCase, Case mergeCase) {
        try {
			//Step 3 - Transfer all Files and Notes of the case to be merged to the selected master case
			List<ContentDocumentLink> cdlList = [SELECT Id, ContentDocumentId, LinkedEntityID FROM ContentDocumentLink WHERE LinkedEntityId = :mergeCase.Id];
			Set<Id> contentDocumentIdSet = new Set<Id>();
			for(ContentDocumentLink cdl : cdlList){
				contentDocumentIdSet.add(cdl.ContentDocumentId);
			} 
			List<ContentDocumentLink> newCdlList = new List<ContentDocumentLink>();
			for(Id contentDocId : contentDocumentIdSet){
				ContentDocumentLink cdLink = new ContentDocumentLink(LinkedEntityId = masterCase.Id, ContentDocumentId = contentDocId, ShareType = 'I');
				newCdlList.add(cdLink);
			}
			if(!newCdlList.isEmpty())
				Database.Insert(newCdlList, false);

			//Step 4 - Now that everything has been transferred to the master case, delete the case to be merged. Case merge complete.
			deleteDupeCase(mergeCase);
			return true;
        
        }catch(Exception ex) {
            System.debug('>> Exception in handleCaseMergeUtil : ' + ex);
			return false;
        }
    }
	/**
	* @description			-	Deletes the merged case once it has been converted into a screend case
	* @param mergedCase		-	Case record that needs to be deleted
	*/
	public static void deleteDupeCase(Case mergedCase) {
		
        try{
			System.debug(' >> casetoDelete : ' + mergedCase);
        	Delete mergedCase;
		}catch(DmlException ex) { 
            System.debug('>> Exception in deleteDupeCase : ' + ex);
        }
    }
}