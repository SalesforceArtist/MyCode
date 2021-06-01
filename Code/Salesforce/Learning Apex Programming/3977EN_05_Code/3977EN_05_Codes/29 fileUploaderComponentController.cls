public with sharing class fileUploaderComponentController { 

	public Attachment file {get;set;}

	public fileUploaderComponentController(){
		file = new Attachment();
	}

	public PageReference upload(){
		insert file;
		//we need to set the body to null to avoid the viewstate limit
		file.body = null;
		return null;
	}
}