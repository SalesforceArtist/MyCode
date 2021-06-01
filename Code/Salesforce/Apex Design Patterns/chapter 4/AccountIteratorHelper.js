({
	getNextItem : function(component, helper) {
		var action = component.get("c.getAccount");
        var curInd = component.get("v.currentIndex");
        
        if(isNaN(curInd)){
            curInd = 0;
        } 
        
		action.setParams({
            index : curInd 
        });
             
        action.setCallback(this, function(actionResult) {
            var retVal = actionResult.getReturnValue() ;
            
            
            if(retVal == 'empty')
            { 
                //No more data in list so restart
                curInd = 0 ;
                component.set("v.currentIndex", curInd);                   
                helper.getNextItem(component, helper);
                
            }else{
                var jsonObj = JSON.parse(retVal); 
                var curInd = component.get("v.currentIndex") ;
                if(isNaN(curInd)){
                    curInd = 0;
                } 
                curInd = 0 + curInd + 1;               
                component.set("v.accountName", jsonObj.Name);  
                component.set("v.accountSymbol", jsonObj.TickerSymbol);                  
                component.set("v.currentIndex", curInd);  
                
            } 
                      
        });
        
        $A.enqueueAction(action);

	}
})