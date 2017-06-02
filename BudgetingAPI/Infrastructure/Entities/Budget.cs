using System;
using System.Collections.Generic;

namespace BudgetingAPI.Infrastructure.Entities
{
	public class Budget : IEntity
    {
		public Guid BudgetId { get; set; }
		public int Month { get; set; }
		public int Year { get; set; }
		public List<Transaction> Transactions { get; set; }
		public decimal Savings { get; set; }
		public string UserId { get; set; }
		public virtual BudgetUser User { get; set; }
    }
}
