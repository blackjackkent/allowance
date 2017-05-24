namespace BudgetingAPI.Infrastructure.Entities
{
	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore;

	public class BudgetContext : IdentityDbContext
    {
	    public BudgetContext(DbContextOptions options)
		    : base(options)
	    { }

		public DbSet<MonthlyBudget> MonthlyBudgets { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
    }
}
