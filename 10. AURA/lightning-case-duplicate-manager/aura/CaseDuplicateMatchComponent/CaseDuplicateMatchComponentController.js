({
	doInit : function(component, event, helper) {
		
		var action = component.get('c.checkIfMaster');
		action.setParam('caseId', component.get('v.recordId'));

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var caseRec = response.getReturnValue();
				component.set('v.isMaster', caseRec.Is_Master__c);
				component.set('v.caseRecord', caseRec);
				if(!caseRec.Is_Master__c)
					helper.getDupeCaseList(component,helper);

            } else if (state === 'INCOMPLETE') {
                console.log('>> Error checking is Master');
            } else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
                    component.set('v.errorMessage', errors[0].message);
                }
            }
        });

		$A.enqueueAction(action);
	},
	closeModel: function(component, event, helper) {
		component.set("v.showWarning", false);
	},
	handleCaseOption : function(component, event, helper) {

		var confirmationType = event.getParam("type");
		var index = event.getParam("index");
		component.set('v.caseIndex', index);

		if(confirmationType == 'Remove'){
			component.set('v.confirmationType', 'Remove');
			component.set('v.warningLabel',  component.get("v.removeWarningLabel"));
			component.set('v.showWarning', true);
		}
		if(confirmationType == 'Merge'){
			component.set('v.confirmationType', 'Merge');
			var caseRecNum = component.get('v.caseList')[index].CaseNumber;
			var mergeCaseNum = component.get('v.caseRecord').CaseNumber;
			var formattedLabel = component.get("v.mergeWarningLabel").split("{0}").join(caseRecNum);
			formattedLabel = formattedLabel.split("{1}").join(mergeCaseNum);
			component.set('v.warningLabel',  formattedLabel);
			component.set('v.showWarning', true);
		}
	},
	handleCaseConfirm : function(component, event, helper) {

		var confirmationType = component.get('v.confirmationType');
		var index = component.get('v.caseIndex');
		
		if(confirmationType == 'Remove'){
			helper.showSpinner(component,helper);
			helper.removeCase(component,helper,index);
		}
		if(confirmationType == 'Master'){
			helper.showSpinner(component,helper);
			helper.makeMaster(component,helper);
		}
		if(confirmationType == 'Merge'){
			helper.showSpinner(component,helper);
			helper.mergeCase(component,helper,index);
		}
	},
	makeMaster : function(component, event, helper) {

		component.set('v.confirmationType', 'Master');
		component.set('v.warningLabel',  component.get("v.makeMasterWarningLabel"));
		component.set('v.showWarning', true);
	}
})