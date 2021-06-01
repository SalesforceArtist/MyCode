/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public virtual class PopRockMusic extends PopMusic{
    protected String title; 
    protected String album;
     
    public PopRockMusic(String title,  String album){
        super(title,album);
        this.title = title; 
        this.album = album;
    }
    
    public virtual override String getMusicDetail(){  
        return 'Pop Rock Music : Title - '+title+' ,album - '+album; 
    }
    
    public virtual override void accept(IMusicVisitor visitor){
        visitor.visit(this);
    }
}