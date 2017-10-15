namespace BudgetingAPI.Models.DomainModels
{
	using System;

	public class Transaction
    {
		public Guid? TransactionId { get; set; }
		public string TransactionName { get; set; }
		public TransactionType TransactionType { get; set; }
		public DateTime TransactionDate { get; set; }
		public decimal Value { get; set; }
		public string ApiUrl { get; set; }
		public Guid BudgetId { get; set; }
    }
}
