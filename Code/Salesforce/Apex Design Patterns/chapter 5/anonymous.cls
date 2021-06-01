/**
*   Code snippets of anonymous Apex used in Chapter 5 - Concurrency 
*/

/*-- 	Script 1 	--*/
FundOperations.addFund('Universal Non Profit',5000,4);
FundOperations.addFund('Universal Non Profit',5000,4);

/*-- 	Script 2 	--*/
Enqueue_ActiveObject.addFund('Company ABC',5000);
Enqueue_ActiveObject.addFund('Company ABC',7000);