using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAPI.Infrastructure.Repositories
{
	using Entities;
    public class BudgetRepository : BaseRepository<Budget>
    {
	    public BudgetRepository(BudgetContext context) : base(context)
	    {
		    DbSet = context.Budgets;
	    }
    }
}
