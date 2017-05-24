namespace BudgetingAPI.Infrastructure.Entities
{
	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

	public class BudgetUser : IdentityUser, IEntity
    {
    }
}
