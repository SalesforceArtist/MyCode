public class GetterSetterExample{
    String GetterVariable;
    public String GetterVariableDefault{get;set;}
   
    public String getGetterVariable() {
        return GetterVariable;
    }
    
    public void setGetterVariable(String s) {
        GetterVariable = s;
    }

}