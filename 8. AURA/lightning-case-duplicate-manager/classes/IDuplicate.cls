/***********************************************************************
Class          : IDuplicate
Author         : Shantanu 
Created Date   : 08/28/2018
Description    : Interface for duplicate matches
************************************************************************/
public interface IDuplicate {
	List<sObject> handle(sObject rec);
}