public with sharing class fileUploaderController {

	public Id parentId {get;set;}

	//Define a list of integers to loop through on our page
	public List<Integer> integerList {get;set;}
	
	public fileUploaderController (){
		//Get the id parameter from the URL
		parentId = apexPages.currentPage().getParameters().get('id');
	
		//initialize our integerList to avoid a nullPointerException
		integerList = new List<Integer>{1,2,3};
	}
	
	public void addInteger(){
		//add an additional item to our list
		integerList.add(integerList.size()+1);
	}
	
	public PageReference cancel(){
		//redirect the user to the view page for the record using
		//a relative URL
		return new PageReference('/'+parentId).setRedirect(true);
	}

}