/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * This class implements Iterator pattern
 * */
public class AccountIterator implements Iiterator{
        
        List<Account> lstAccount ;
        integer currentIndex = 0;
    
        public void setCurentIndex(Integer index){
            currentIndex = index;
        }    
    
        public AccountIterator(List<Account> lstAcc ){
            this.lstAccount = lstAcc;
        }
        
        public boolean hasNext(){ 
            
            if(currentIndex < lstAccount.size())
            { 
                return true;
            } 
            return false;
        }
        
        public Object next(){  
            return lstAccount[currentIndex]; 
        }
    }