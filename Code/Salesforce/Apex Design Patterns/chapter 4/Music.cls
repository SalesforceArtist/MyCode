/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public abstract class Music {
	protected String title; 
    protected String album;
    
    public abstract String getMusicDetail(); 
    public abstract void accept(IMusicVisitor visitor); 
}