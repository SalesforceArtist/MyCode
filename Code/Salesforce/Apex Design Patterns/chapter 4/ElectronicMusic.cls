/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public class ElectronicMusic extends Music{

    public ElectronicMusic(String title,  String album){
        this.title = title;  
        this.album = album;
    }
    
    public override String getMusicDetail(){ 
        return 'Electronic Music : Title - '+title+' ,album - '+album; 
    }
    
    public override void accept(IMusicVisitor visitor){
        visitor.visit(this);
    }
}