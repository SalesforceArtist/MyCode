public class TaskManagerChart {
    
    @AuraEnabled
    public static List<DataSet> getAllTasksByStatus(){
        List<AggregateResult> result =  [Select Count(Id) cnt, Status from Task group by Status ];
        List<DataSet> dataSet = new List<DataSet>();
        for(AggregateResult ar:result){
            String status =  (String)ar.get('Status') ;
            Integer total =(Integer)ar.get('cnt'); 
            dataSet.add(new DataSet(status ,total));
            
        }
        System.debug('dataSet'+dataSet);
        return dataSet ; 
    }
    
    public class DataSet{
        public DataSet(String label ,Integer count){
            this.label  = label ; 
            this.count = count ;
        }
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public Integer  count {get;set;}
    }
    
}