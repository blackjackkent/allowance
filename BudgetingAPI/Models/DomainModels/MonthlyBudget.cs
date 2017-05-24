using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAPI.Models.DomainModels
{
    public class MonthlyBudget
    {
	    public Guid MonthlyBudgetId { get; set; }
	    public int Month { get; set; }
	    public int Year { get; set; }
	    public List<Transaction> Income { get; set; }
	    public List<Transaction> Bills { get; set; }
	    public List<Transaction> Expenses { get; set; }
	    public decimal Savings { get; set; }
		public string ApiUrl { get; set; }
	}
}
