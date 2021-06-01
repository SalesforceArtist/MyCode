/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Single and Double Dispatch
 * */
public virtual class Insurance { 
    
    public virtual void insure(Car c){
        System.debug('This is insurance for Car');
    }   
    
    public virtual void insure(Honda c){
        System.debug('This is insurance for Honda');
    }
}