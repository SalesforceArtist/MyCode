/*
MIT License

Copyright (c) 2020 Playground, https://www.playg.app

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

public with sharing class ReportDependencyFinder {

    /**
     * Method to generate a link on Report name in table
     */
    private static String generateReportLink(String name, String reportId){
        return '<a href="/' + reportId + '" target="_blank">' + name + '<a>';
    }

    /**
     * Method to send all reports dependencies with matching
     * keyword
     */
    @AuraEnabled
    public static String getResults(String keyword){

        //blank keyword if null
        if(String.isBlank(keyword)){
            keyword = '';
        }

        List<ReportSchema> listOfReportSchema = new List<ReportSchema>();

        for(Report rep : [SELECT Id,DeveloperName FROM Report]){
            Boolean printReport = false;

            // describe a report
            Reports.ReportDescribeResult results = Reports.ReportManager.describeReport(rep.Id);
            Reports.ReportMetadata rm = results.getReportMetadata();
            ReportSchema rSchema;
            for(String column: rm.getDetailColumns()){
                if(column.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
                    if(!printReport){
                        rSchema = new ReportSchema();
                        rSchema.Name =  generateReportLink(rm.getName(), rep.Id);
                        rSchema.Type = String.valueOf(rm.getReportFormat());
                        printReport = true;
                    }
                    if(rSchema.Columns == null){
                        rSchema.Columns = new List<String>();
                    }
                    rSchema.Columns.add(column);
                }
            }

            for(Reports.ReportFilter filter : rm.getReportFilters()){
                String filterColumn = filter.getColumn();
                if(filterColumn.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
                    if(!printReport){
                        rSchema = new ReportSchema();
                        rSchema.Name =  generateReportLink(rm.getName(), rep.Id);
                        rSchema.Type = String.valueOf(rm.getReportFormat());
                        printReport = true;
                    }
                    if(rSchema.FilterColumns == null){
                        rSchema.FilterColumns = new List<String>();
                    }
                    rSchema.FilterColumns.add(filterColumn);
                }
            }

            if(rSchema != null){
                listOfReportSchema.add(rSchema);
            }
        }

        if(listOfReportSchema != null && listOfReportSchema.size() > 0){
            System.debug('======================================');
            System.debug(JSON.serialize(listOfReportSchema));
            System.debug('======================================');
            return JSON.serialize(listOfReportSchema);
        }else {
            return '';
        }
    }

    /**
     * Wrapper class to send report schema
     */
    public class ReportSchema{
        public String Name;
        public String Type;
        public List<String> Columns;
        public List<String> FilterColumns;
    }
}
