namespace BudgetingAPI.Infrastructure.Entities
{
	using Microsoft.EntityFrameworkCore;

	public class BudgetContext : DbContext
    {
	    public BudgetContext(DbContextOptions options)
		    : base(options)
	    { }

		public DbSet<MonthlyBudget> MonthlyBudgets { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
    }
}
