public class salesProfitCalculator extends profitCalculator{
	public override Decimal calculateExpenses(){
		return 600;
	}
	public Decimal calculateProfit(){
		Decimal income = calculateIncome();	//1000
		Decimal expenses = calculateExpenses();	//600
		return income - expenses;
	}
}