using System;
using System.Collections.Generic;

namespace BudgetingAPI.Infrastructure.Entities
{

	public class MonthlyBudget : IEntity
    {
		public Guid MonthlyBudgetId { get; set; }
		public int Month { get; set; }
		public int Year { get; set; }
		public List<Transaction> Transactions { get; set; }
		public decimal Savings { get; set; }
    }
}
