/**
 * Chapter 5   	:   Concurrency Pattern
 * Author    	:  	Jitendra Zaa
 * Description	:	This class contains future method, which adds fund to requested Account.
 * 				:	calling below mwthod multiple times for same "Fund Account" creates concurrency problem.
 * */ 
public class FundOperations {

    @future
    public static void addFund(String accountName, Decimal amount, Integer pause_second){
        List<Fund_Account__c> lstfundAcc = [SELECT Available_Fund__c FROM Fund_Account__c WHERE NAME =: accountName LIMIT 1];
        if(!lstfundAcc.isEmpty())
        {
            Timer.pause(pause_second);
            lstfundAcc[0].Available_Fund__c = lstfundAcc[0].Available_Fund__c + amount;
            update lstfundAcc;
        }
    }
}