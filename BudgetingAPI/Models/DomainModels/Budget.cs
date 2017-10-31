using System;
using System.Collections.Generic;

namespace BudgetingAPI.Models.DomainModels
{
	using System.Linq;

	public class Budget
    {
	    public Guid BudgetId { get; set; }
	    public List<Transaction> Transactions { get; set; }
	    public decimal Savings { get; set; }
		public string ApiUrl { get; set; }
		public string UserId { get; set; }
	    public decimal BillTotal => Transactions.Where(t => t.TransactionType == TransactionType.Bill).Sum(t => t.Value);
		public decimal ExpenseTotal => Transactions.Where(t => t.TransactionType == TransactionType.Expense).Sum(t => t.Value);
		public decimal IncomeTotal => Transactions.Where(t => t.TransactionType == TransactionType.Income).Sum(t => t.Value);

	    public decimal SpendPerDay
	    {
		    get
		    {
			    var currentDate = DateTime.UtcNow;
			    var currentMonth = currentDate.Month;
			    var currentYear = currentDate.Year;
			    var daysInMonth = DateTime.DaysInMonth(currentYear, currentMonth);
			    var remainingDaysInMonth = daysInMonth - currentDate.Day + 1;
			    var outflow = BillTotal + ExpenseTotal;
			    var moneyToSpend = IncomeTotal - outflow - Savings;
			    return moneyToSpend / remainingDaysInMonth;
		    }
	    }
	}
}
