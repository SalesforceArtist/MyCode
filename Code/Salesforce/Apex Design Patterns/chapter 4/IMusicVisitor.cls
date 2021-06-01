/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Visitor Pattern example
 * */
public interface IMusicVisitor {
	void visit(RockMusic music);
	void visit(PopMusic music);
	void visit(ElectronicMusic music);
}