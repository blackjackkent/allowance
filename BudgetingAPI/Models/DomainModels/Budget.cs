using System;
using System.Collections.Generic;

namespace BudgetingAPI.Models.DomainModels
{
    public class Budget
    {
	    public Guid BudgetId { get; set; }
	    public int Month { get; set; }
	    public int Year { get; set; }
	    public List<Transaction> Transactions { get; set; }
	    public decimal Savings { get; set; }
		public string ApiUrl { get; set; }
		public string UserId { get; set; }
	}
}
