namespace BudgetingAPI.Infrastructure.Repositories
{
	using Entities;
    public class TransactionRepository : BaseRepository<Transaction>
    {
	    public TransactionRepository(BudgetContext context) : base(context)
	    {
		    DbSet = context.Transactions;
	    }
    }
}
