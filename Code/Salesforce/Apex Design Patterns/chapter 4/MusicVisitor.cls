/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public class MusicVisitor  implements IMusicVisitor{
    
    	public List<RockMusic> lstRockMusic = null;
        public List<PopMusic> lstPopMusic = null;
        public List<ElectronicMusic> lstElectronicMusic = null;
    
        public Double finalPrice = 0;
    
        public MusicVisitor(){
            lstRockMusic = new List<RockMusic>();
            lstPopMusic = new List<PopMusic>();
            lstElectronicMusic = new List<ElectronicMusic>(); 
        }
        
        public void visit(RockMusic music){
            lstRockMusic.add(music);
            finalPrice += 2;
        }
        public void visit(PopMusic music){
            lstPopMusic.add(music); 
            finalPrice += 3;
        }
        public void visit(ElectronicMusic music){
            lstElectronicMusic.add(music);
            finalPrice += 4;
        } 
}