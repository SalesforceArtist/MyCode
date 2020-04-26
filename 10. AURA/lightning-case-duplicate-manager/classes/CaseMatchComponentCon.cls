/***********************************************************************
Class          	: CaseMatchComponentCon
Author         	: Shantanu
Created Date   	: 08/30/2018
Description    	: Apex Controller for CaseDuplicateMatchComponent - Contains business logic to display matching case records and handle various case options
************************************************************************/ 
public with sharing class CaseMatchComponentCon {
	public CaseMatchComponentCon() {
		
	}

	/**
	* @description	-	checks if the case being viewed is master or not, further determines if the lightning component should be displayed or hidden
	* @param caseId	-	Id of case being viewed
	* @return		-	Case(record)
	*/
	@AuraEnabled
    public static Case checkIfMaster(Id caseId) {
		
		Case caseRec = [SELECT Id, Is_Master__c, CaseNumber 
							FROM Case 
								WHERE Id = :caseId];
		return caseRec;
	}
	
 	/**
	* @description	-	Gets a list of matching cases based upon match criteria set in CMDT settings 
	* @param caseId	-	Id of case being viewed
	* @return		-	sObject List of matching Cases
	*/
	@AuraEnabled
    public static List<sObject> getDupeCases(Id caseId) {
		
		String mainCaseQuery = 'SELECT Id, Is_Master__c, Exclusion_Case_List__c';
		Set<String> fieldNameSet = new Set<String>();
		for(Record_Match_Rule__mdt matchRule : CaseMatchComponentCon.getCaseMatchRules()){
			fieldNameSet.add(matchRule.Object_Field__c);
		}

		for(String fieldName : fieldNameSet){
			mainCaseQuery += ', ' + fieldName;
		}
		mainCaseQuery += ' FROM Case WHERE Id = ' + '\'' + caseId + '\'';
		System.debug('>> mainCaseQuery : ' + mainCaseQuery);
		Case caseRec = Database.Query(mainCaseQuery);

		CaseDuplicate caseDupeObj = new CaseDuplicate();
		List<sObject> caseMatches = caseDupeObj.handle(caseRec);
		/* if(caseMatches.isEmpty())
			markAsMaster(caseId); */

		return caseMatches;
	}

	/**
	* @description	-	Marks a case as the master
	* @param caseId	-	Id of case being viewed
	* @return		-	Boolean(True/False)
	*/
	@AuraEnabled
    public static Boolean markAsMaster(Id caseId) {
		
		Case caseRec = [SELECT Id, Is_Master__c 
							FROM Case 
								WHERE Id = :caseId];
		caseRec.Is_Master__c = true;
		Database.Update(caseRec, false);
		return true;
	}

	/**
	* @description			-	Adds cases to be excluded from the Possible case match list
	* @param caseId			-	Id of case being viewed
	* @param excludeCaseId	-	Id of the case to be excluded
	* @return				-	Boolean(True/False)
	*/
	@AuraEnabled
    public static Boolean excludeCase(Id caseId, Id excludeCaseId) {
		
		Case caseRec = [SELECT Id, Exclusion_Case_List__c FROM Case WHERE Id = :caseId];
		if(String.isEmpty(caseRec.Exclusion_Case_List__c)){
			caseRec.Exclusion_Case_List__c = '\'' + excludeCaseId + '\'';
		}
		else{
			caseRec.Exclusion_Case_List__c = caseRec.Exclusion_Case_List__c + ',' + '\'' + excludeCaseId + '\'';
		}
		Database.Update(caseRec, false);
		return true;
	}

	/**
	* @description			-	Merge the case being viewed with the selected case
	* @param caseId			-	Id of case being viewed
	* @param mergeCaseId	-	Id of the case to be merged with
	* @return				-	Boolean(True/False)
	*/
	@AuraEnabled
    public static Boolean handleCaseMerge(Id caseId, Id mergeCaseId) {
		
		Set<Id> caseIdSet = new Set<Id>{caseId, mergeCaseId};
		System.debug('>> caseIdSet : ' + caseIdSet);
		Map<ID, Case> caseRecordMap = new Map<ID, Case>([SELECT Id,Subject,Origin,SuppliedEmail,ContactId,Description,Owner.Name,AccountId 
															FROM Case WHERE Id IN : caseIdSet]);
		System.debug('>> caseRecordMap : ' + caseRecordMap);
		Boolean mergeResult = CaseDuplicate.handleCaseMergeUtil(caseRecordMap.get(caseId), caseRecordMap.get(mergeCaseId));
		return mergeResult;
	}

	public static List<Record_Match_Rule__mdt> getCaseMatchRules() {
		
		CaseDuplicate caseDupeObject = new CaseDuplicate();
		return caseDupeObject.getMatchingRules();
	}

	/**
	* @description			-	Get the case fields to be displayed on the Lightning component based upon the field set
	* @param fieldSetName	-	Name of the field set to use
	* @param objectName		-	Object Api Name 
	* @return				-	List of custom wrapper List<FieldWrapper> to be used by the lightning component
	*/
	@AuraEnabled
	public static List<FieldWrapper> getColumns(String fieldSetName, String objectName) {
		List<FieldWrapper> fields = new List<FieldWrapper>();
		Map<String,Schema.DescribeFieldResult> fieldDescribeMap = new Map<String, Schema.DescribeFieldResult>();
		Map<String, String> fieldReferenceMap = new Map<string,String>();
		Schema.DescribeSObjectResult objectDescribe = Schema.getGlobalDescribe().get(objectName).getDescribe();
		Map<String, Schema.FieldSet> fieldSetMap = objectDescribe.fieldSets.getMap();
		Map<String, Schema.SObjectField> fieldMap = objectDescribe.Fields.getMap();
        Schema.FieldSet fieldSet = fieldSetMap.get(fieldSetName);
        List<Schema.FieldSetMember> fieldSetMembers = fieldSet.getFields();

        for(String field : fieldMap.keyset()){
		    if (fieldMap.containsKey(field)) {
		      Schema.DescribeFieldResult dr = fieldMap.get(field).getDescribe();
		      fieldReferenceMap.put(field,String.valueOf(dr.getReferenceTo()).removeEnd(')').removeStart('('));
		      fieldDescribeMap.put(field, dr); 
		    }
		}
        for(Schema.FieldSetMember fsm : fieldSetMembers) {
            
			FieldWrapper f = new FieldWrapper(fsm,objectName);
			fields.add(f);
        }
		return fields;
	}

	/**
	* @description	-	Custom wrapper to contain field api information 
	*/
	public class FieldWrapper {

		public FieldWrapper(Schema.FieldSetMember f,String objectTypeName) {
			this.objectTypeName = objectTypeName;
	        this.APIName = f.fieldPath;
	        this.Label = f.label;
    	}
		
		@AuraEnabled
		public String objectTypeName {get;set;}
		
		@AuraEnabled
		public String APIName { get;set; }
		
		@AuraEnabled
		public String Label { get;set; }
	}
}