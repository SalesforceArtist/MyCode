({
    /* Omni toolkit Api */
    onLoginSuccess: function (component, event, helper) {
        var statusId = event.getParam('statusId');
        //helper.logger('onLoginSuccess statusId', statusId, 'Info');
    },

    onStatusChanged: function (component, event, helper) {
        var statusId = event.getParam('statusId');
        var channels = event.getParam('channels');
        var statusName = event.getParam('statusName');
        var statusApiName = event.getParam('statusApiName');
        //helper.logger('onStatusChanged channels', channels, 'Info');
        helper.logger('onStatusChanged statusName', statusName, 'Info');
    },

    onLogout: function (component, event, helper) {
        helper.logger('onLogout', 'Logout success', 'Info');
    },

    onWorkAssigned: function (component, event, helper) {
        var workItemId = event.getParam('workItemId');
        var workId = event.getParam('workId');
        helper.logger('onWorkAssigned workItemId', workItemId, 'Info');
    },

    onWorkAccepted: function (component, event, helper) {
        var workAcceptTimestamp = new Date;
        component.set('v.workAcceptTimestamp', workAcceptTimestamp);
        console.log('>> onWorkAccepted > timestamp ' + workAcceptTimestamp);
        var workItemId = event.getParam('workItemId');
        var workId = event.getParam('workId');
        helper.logger('onWorkAccepted workItemId', workItemId, 'Info');
    },

    onWorkDeclined: function (component, event, helper) {
        var workItemId = event.getParam('workItemId');
        var workId = event.getParam('workId');
        helper.logger('onWorkDeclined workItemId', workItemId, 'Info');
    },

    onWorkClosed: function (component, event, helper) {
        var workItemId = event.getParam('workItemId');
        var workId = event.getParam('workId');
        helper.logger('onWorkClosed workItemId', workItemId, 'Info');
    },

    onWorkloadChanged: function (component, event, helper) {
        var configuredCapacity = event.getParam('configuredCapacity');
        var previousWorkload = event.getParam('previousWorkload');
        var newWorkload = event.getParam('newWorkload');
        //helper.logger('onWorkloadChanged configuredCapacity', configuredCapacity, 'Info');
        //helper.logger('onWorkloadChanged previousWorkload', previousWorkload, 'Info');
        helper.logger('onWorkloadChanged newWorkload', newWorkload, 'Info');
    },
    /* END Omni toolkit Api */

    /* Lightning Console Api */
    openUtilityBar: function (component, event, helper) {
        helper.logger('openUtilityBar', '', 'Info');
        var utilityAPI = component.find("utilitybar");
        utilityAPI.openUtility();
    },

    openTab: function (component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            pageReference: {
                "type": "standard__recordPage",
                "attributes": {
                    "recordId": "5001U000005dSWgQAM",
                    "actionName": "view"
                },
                "state": {}
            },
            focus: true
        }).then(function (response) {
            workspaceAPI.getTabInfo({
                tabId: response
            }).then(function (tabInfo) {
                helper.logger('openTab > recordId', tabInfo.recordId, 'Info');
            });
        }).catch(function (error) {
            helper.logger('openTab error', error, 'Error');
        });
    },

    focusNavigationItem: function (component, event, helper) {
        var navigationItemAPI = component.find("navigationItem");
        navigationItemAPI.focusNavigationItem().then(function (response) {
                helper.logger('focusNavigationItem > response', response, 'Info');
            })
            .catch(function (error) {
                helper.logger('focusNavigationItem > error', error, 'Error');
            });
    },

    onRecordIdChange: function (component, event, helper) {
        var newRecordId = component.get("v.recordId");
        helper.logger('onRecordIdChange > newRecordId', newRecordId, 'Info');
    },

    getChatLog: function (component, event, helper) {
        var conversationKit = component.find("conversationKit");
        var recordId = component.get("v.recordId");
        conversationKit.getChatLog({
                recordId: recordId
            })
            .then(function (result) {
                if (result) {
                    helper.logger('focusNavigationItem >', 'Successfully retrieved chat log', 'Info');
                    helper.logger('focusNavigationItem > result', JSON.stringify(result), 'Info');
                } else {
                    helper.logger('focusNavigationItem >', 'Failed to retrieve chat log', 'Error');
                }
            });
    },

    onAgentSend: function (component, event, helper) {
        var onAgentSendTimestamp = new Date;
        console.log('>> onAgentSend > timestamp ' + onAgentSendTimestamp);
        var recordId = event.getParam("recordId");
        var content = event.getParam("content");
        var name = event.getParam("name");
        var type = event.getParam("type");
        var timestamp = event.getParam("timestamp");
        console.log(">> onAgentSend > recordId:" + recordId + " content:" + content + " name:" + name + " type:" + type + " timestamp:" + timestamp);
    },

    onNewMessage: function (component, event, helper) {
        var recordId = event.getParam('recordId');
        var content = event.getParam('content');
        var name = event.getParam('name');
        var type = event.getParam('type');
        var timestamp = event.getParam('timestamp');

        console.log(">> onNewMessage > recordId:" + recordId + " content:" + content + " name:" + name + " type:" + type + " timestamp:" + timestamp);
    },

    onTabClosed: function (component, event, helper) {
        var tabId = event.getParam('tabId');
        helper.logger('onTabClosed > tabId', tabId, 'Info');
    },

    onTabCreated: function (component, event, helper) {
        //helper.logger('onTabCreated', 'Tab created', 'Info');
        var newTabId = event.getParam('tabId');
        var workspaceAPI = component.find("workspace");workspaceAPI.setTabLabel({
             tabId: newTabId,
             label: 'New Tab'
         });
    },

    onTabFocused: function (component, event, helper) {
        var focusedTabId = event.getParam('currentTabId');
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getTabInfo({
            tabId: focusedTabId
        }).then(function (response) {
            //helper.logger('onTabFocused > response', JSON.stringify(response), 'Info');
        });
    },

    onTabRefreshed: function (component, event, helper) {
        var refreshedTabId = event.getParam("tabId");
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getTabInfo({
            tabId: refreshedTabId
        }).then(function (response) {
            //helper.logger('onTabRefreshed > response', response, 'Info');
        });
    },

    onTabReplaced: function (component, event, helper) {
        var replacedTabId = event.getParam("tabId");
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getTabURL({
            tabId: replacedTabId
        }).then(function (response) {
            helper.logger('onTabReplaced > response', response, 'Info');
        });
    },

    onTabUpdated: function (component, event, helper) {
        var updatedTabId = event.getParam("tabId");
        helper.logger('onTabUpdated > updatedTabId', updatedTabId, 'Info');
    },
    /* END - Lightning Console Api */
})