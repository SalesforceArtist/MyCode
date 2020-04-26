({
	getCaseFieldset : function(component,helper) {
		var action = component.get("c.getColumns");
		action.setParams({
            fieldSetName: 'Case_Matches',
            objectName: 'Case'
        });
		action.setCallback(this,function(a) {
			if (a.getState() == 'SUCCESS') {
				var fieldList = a.getReturnValue();
				component.set("v.fieldList",fieldList);

				var fieldSet = component.get("v.fieldList");

				var transformedData = [];
				var fieldSetApiNameList = [];
				var fieldSetNameList = [];
				for(var i=0; i< fieldSet.length; i=i+1){
					fieldSetApiNameList.push(fieldSet[i].APIName);
					fieldSetNameList.push(fieldSet[i].Label);
				}

				var dupeCases = component.get('v.caseList');
				for(var i=0; i< dupeCases.length; i=i+1){
					transformedData.push({
						Id : dupeCases[i].Id,
						Subject : dupeCases[i].Subject, 
						fields : []
					});
				}
				for(var i=0; i< transformedData.length; i=i+1){
					var caseId = transformedData[i].Id;
					for(var x=0; x< dupeCases.length; x=x+1){
						if(caseId == dupeCases[x].Id){
							for(var y=0; y<fieldSetApiNameList.length; y++){
								transformedData[i].fields.push({
									Label : fieldSetNameList[y],
									Value : dupeCases[x][fieldSetApiNameList[y]]
								})
							}
						}
					}
				}
				component.set('v.transformedData', transformedData);

			} else if (a.getState() == 'ERROR') {
				var errors = a.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
					component.set('v.errorMessage', errors[0].message);
					this.showtoast(component,helper, 'Error', 'There has been an error', 'Error');
                }
			}
		});
		$A.enqueueAction(action);
	},
	
	getDupeCaseList : function(component,helper) {

		var action = component.get('c.getDupeCases');
		action.setParam('caseId', component.get('v.recordId'));
        action.setStorable();

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var dupeCases = response.getReturnValue();
				if(!dupeCases) return;
				component.set('v.caseList', dupeCases);
				helper.getCaseFieldset(component,helper);

            } else if (state === 'INCOMPLETE') {
                console.log('>> Error checking in getting case matches');
            } else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
					component.set('v.errorMessage', errors[0].message);
					this.showtoast(component,helper, 'Error', 'There has been an error', 'Error');
                }
            }
        });

		$A.enqueueAction(action);
	},

	removeCase : function(component,helper,index) {
		
		var caseRecId = component.get('v.caseList')[index].Id;

		var action = component.get('c.excludeCase');
		action.setParam('caseId', component.get('v.recordId'));
		action.setParam('excludeCaseId', caseRecId);
        action.setStorable();

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
				var result = response.getReturnValue();
				if(result){
					var caseList = component.get("v.caseList");
					caseList.splice(index,1);
					component.set("v.caseList",caseList);
					this.getCaseFieldset(component,helper);
					component.set('v.showWarning', false);
					this.hideSpinner(component,helper);
					var removeSuccessMsg = $A.get("$Label.c.RemoveCaseSuccessMessage") == null ? 'The case has been removed' : $A.get("$Label.c.RemoveCaseSuccessMessage");
					this.showtoast(component,helper, 'Success', removeSuccessMsg, 'Success');
				}
				
            } else if (state === 'INCOMPLETE') {
                console.log('>> removeCase incomplete');
            } else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
					component.set('v.errorMessage', errors[0].message);
					this.showtoast(component,helper, 'Error', 'There has been an error', 'Error');
                }
            }
        });

		$A.enqueueAction(action);
	},

	makeMaster : function(component,helper) {

		var action = component.get('c.markAsMaster');
		action.setParam('caseId', component.get('v.recordId'));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
				var result = response.getReturnValue();
				if(result){
					component.set('v.showWarning', false);
					this.hideSpinner(component,helper);
					component.set('v.isMaster', true);
					$A.get('e.force:refreshView').fire();
					var masterSuccessMsg = $A.get("$Label.c.MasterCaseSuccessMessage") == null ? 'This case has been marked as master' : $A.get("$Label.c.MasterCaseSuccessMessage");
					this.showtoast(component,helper, 'Success', masterSuccessMsg, 'Success');
				}
				
            } else if (state === 'INCOMPLETE') {
                console.log('>> makeMaster incomplete');
            } else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
					component.set('v.errorMessage', errors[0].message);
					this.showtoast(component,helper, 'Error', 'There has been an error', 'Error');
                }
            }
        });

		$A.enqueueAction(action);
	},

	mergeCase : function(component,helper,index) {

		var caseRecId = component.get('v.caseList')[index].Id;

		var action = component.get('c.handleCaseMerge');
		action.setParam('caseId', caseRecId);
		action.setParam('mergeCaseId', component.get('v.recordId'));

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
				var result = response.getReturnValue();
				if(result){
					var caseList = component.get("v.caseList");
					caseList.splice(index,1);
					component.set("v.caseList",caseList);
					this.getCaseFieldset(component,helper);
					component.set('v.showWarning', false);
					this.hideSpinner(component,helper);
					this.checkConsoleViewAndNavigate(component, helper, caseRecId);
				}
            } else if (state === 'INCOMPLETE') {
                console.log('>> mergeCase incomplete');
            } else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
					component.set('v.error', true);
					component.set('v.errorMessage', errors[0].message);
					this.showtoast(component,helper, 'Error', 'There has been an error', 'Error');
                }
            }
        });

		$A.enqueueAction(action);
	},

	showtoast: function(component, helper, title, message, type) {
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			title: title,
			message: message,
			type: type
		});
		toastEvent.fire();
	},

	showSpinner: function(component, helper) {
		component.set("v.Spinner", true); 
	},
	 
	hideSpinner : function(component, helper){
		component.set("v.Spinner", false);
	},

	checkConsoleViewAndNavigate : function(component, helper, caseRecId) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.isConsoleNavigation().then(function(response) {
			response ? helper.handleConsoleTabs(component, helper, caseRecId) : helper.navigateToMergedCase(component, helper, caseRecId);
        })
        .catch(function(error) {
            console.log('>> isConsoleNavigation error : ' + error);
        });
	},
	
	handleConsoleTabs: function(component, helper, caseId) {

		var workspaceAPI = component.find("workspace");
		workspaceAPI.getFocusedTabInfo().then(function(response) {
			var focusedTabId = response.tabId;
			workspaceAPI.closeTab({tabId: focusedTabId});
			workspaceAPI.openTab({
				recordId: caseId,
				focus: true
			}).then(function(response) {
				workspaceAPI.focusTab({
					tabId: response
				});
				workspaceAPI.refreshTab({
					tabId: focusedTabId,
					includeAllSubtabs: true
		   		});	
				setTimeout(function(){
					$A.get('e.force:refreshView').fire();
				}, 1000); 
			})
			.catch(function(error) {
				console.log('>> Error in handleConsoleTabs : ' + error);
			});
		});
	},

	navigateToMergedCase: function(component, helper, caseId) {

		var sObectEvent = $A.get("e.force:navigateToSObject");
		  sObectEvent .setParams({
		  "recordId": caseId ,
		  "slideDevName": "detail"
		});
		sObectEvent.fire(); 
	}
})