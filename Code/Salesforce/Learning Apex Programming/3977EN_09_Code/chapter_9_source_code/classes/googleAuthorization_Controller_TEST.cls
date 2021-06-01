@isTest
private class googleAuthorization_Controller_TEST {
	static testmethod void googleAuthorization_Controller_TEST() {
		googleAuthorization_Controller con = new googleAuthorization_Controller();
		con.requestAuthorization();

		PageReference p = Page.googleAuthorization;
		p.getParameters().put('state',con.googleEmail);
		p.getParameters().put('code','testcode');
		test.setCurrentPage(p);

		test.startTest();
			Test.setMock(HttpCalloutMock.class, new mock_GoogleService());
			con.doOnLoad();
		test.stopTest();
	}
}