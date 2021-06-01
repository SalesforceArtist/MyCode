/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Single and Double Dispatch
 * */
public class PaintInsurance extends Insurance {    
    
    public override void insure(Car c){
        System.debug('This is Paint insurance for Car');
    }    
    
    public override void insure(Honda c){
        System.debug('This is Paint insurance for Honda');
    }
}