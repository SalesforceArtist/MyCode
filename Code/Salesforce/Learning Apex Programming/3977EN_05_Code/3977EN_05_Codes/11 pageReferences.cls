//Create a pageReference to a URL outside of the platform
pageReference outside = new PageReference(‘http://thisbook.com’);

//Create a pageReference using the built-in page class and the name of your Visualforce page
pageReference visualForcePage = page.MyPage;

//Create a relative URL to a screen on the platform
pageReference relative = new PageReference(‘/001’);

//Create a pageReference using the apexPages class (preferred)
pageReference standardView = 
new apexPages.standardController( new Account() ).view();
