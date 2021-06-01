/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public class MusicPriceVisitor  implements IMusicVisitor{    
    
    public Double finalPrice = 0;
    
    public MusicPriceVisitor(){
    }
    
    public void visit(RockMusic music){
        System.debug('In Rock Music Algorithm');
        finalPrice += 2;
    }
    public void visit(PopMusic music){
        System.debug('In Pop Music Algorithm');
        finalPrice += 3;
    }
    public void visit(ElectronicMusic music){
        System.debug('In ELectronic Music Algorithm');
        finalPrice += 4;
    } 
    public void visit(PopRockMusic music){
        System.debug('In PopRock Music Algorithm');
        finalPrice += 2;
    } 
}