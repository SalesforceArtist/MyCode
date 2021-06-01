public class myCustomController{

	//Our property
	public String myId {get;set;}

	//Constructor
	public myCustomController(){
		if ( apexPages.currentPage().getParameters().containsKey('id') ){
			myId = apexPages.currentPage().getParameters().get('id');
		}
	}
}