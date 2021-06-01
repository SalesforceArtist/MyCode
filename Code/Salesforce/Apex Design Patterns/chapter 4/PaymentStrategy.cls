/**
 * Apex Design Patterns - 	Chapter 4
 * Author				-	Jitendra Zaa
 * Strategy Pattern : This interface needs to be implemented by all classes
 * of Payment types which needs to be decided at runtime
 * */
public interface PaymentStrategy {
	  void pay(Double amount);
}