/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Interafce which must be implemented by all iterators
 * */
public interface Iiterator {
	 boolean hasNext();
     Object next();
    void setCurentIndex(Integer index);
}