@isTest(SeeAllData=true)
public with sharing class ReportDependencyFinderTest {

    @isTest
    public static void testAllReports(){
        Test.startTest();
            String jsonString = ReportDependencyFinder.getResults(null);
        Test.stopTest();

        //check results, it should not be blank
        System.assertNotEquals(true, String.isBlank(jsonString));
    }
}
