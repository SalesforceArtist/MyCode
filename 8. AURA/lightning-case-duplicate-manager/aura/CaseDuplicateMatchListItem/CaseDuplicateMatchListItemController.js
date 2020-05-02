({
	doInit : function(component, event, helper) {
		var caseObj = component.get('v.caseListItem');
		var index = component.get('v.caseIndex');
		//console.log('>> caseObj : ' + JSON.stringify(caseObj));
		//console.log('>> index : ' + index);
	},
	remove : function(component, event, helper) {

		var createHandleCaseEvent = component.getEvent('handleCase');
        createHandleCaseEvent.setParams({
            index : component.get('v.caseIndex'),
            type : 'Remove'});

		createHandleCaseEvent.fire();
	},
	merge: function(component, event, helper) {

		var createHandleCaseEvent = component.getEvent('handleCase');
        createHandleCaseEvent.setParams({
            index : component.get('v.caseIndex'),
            type : 'Merge'});

		createHandleCaseEvent.fire();
	},
	navigateToRecord: function(component, event, helper) {
		var selectedItem = event.currentTarget;
        var recordId = selectedItem.dataset.record;
        var navEvt = $A.get("e.force:navigateToSObject");
	    navEvt.setParams({
	      "isredirect": false,
	      "recordId": recordId
	    });
	    navEvt.fire();
	}
})