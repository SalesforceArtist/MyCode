/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public class RockMusic extends Music{ 

    public  RockMusic(String title,  String album){
        this.title = title; 
        this.album = album;
    }
    
    public override String getMusicDetail(){ 
        return 'Rock Music : Title - '+title+' ,album - '+album; 
    }
    
    public override void accept(IMusicVisitor visitor){
        visitor.visit(this);
    }
}