using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAPI.Infrastructure.Entities
{
    public class Transaction
    {
		public Guid TransactionId { get; set; }
		public string TransactionName { get; set; }
		public DateTime TransactionDate { get; set; }
		public decimal Value { get; set; }
    }
}
