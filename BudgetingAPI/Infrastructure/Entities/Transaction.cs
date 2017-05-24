namespace BudgetingAPI.Infrastructure.Entities
{
	using System;
	using Models;

	public class Transaction : IEntity
    {
		public Guid TransactionId { get; set; }
		public string TransactionName { get; set; }
		public DateTime TransactionDate { get; set; }
		public decimal Value { get; set; }
		public TransactionType TransactionType { get; set; }
		public virtual MonthlyBudget Budget { get; set; }
    }
}
