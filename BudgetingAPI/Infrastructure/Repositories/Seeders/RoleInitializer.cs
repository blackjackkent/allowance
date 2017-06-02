using System.Threading.Tasks;

namespace BudgetingAPI.Infrastructure.Repositories.Seeders
{
	using System.Security.Claims;
	using Entities;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

	public class RoleInitializer
    {
	    private readonly RoleManager<IdentityRole> _roleManager;
	    private readonly UserManager<BudgetUser> _userManager;

	    public RoleInitializer(RoleManager<IdentityRole> roleManager, UserManager<BudgetUser> userManager)
	    {
		    _roleManager = roleManager;
		    _userManager = userManager;
	    }

	    public async Task Seed()
	    {

		    var adminRole = await _roleManager.FindByNameAsync("Admin");
		    if (adminRole == null)
		    {
			    adminRole = new IdentityRole("Admin");
			    await _roleManager.CreateAsync(adminRole);

			    await _roleManager.AddClaimAsync(adminRole, new Claim("Permission", "projects.view"));
			    await _roleManager.AddClaimAsync(adminRole, new Claim("Permission", "projects.create"));
			    await _roleManager.AddClaimAsync(adminRole, new Claim("Permission", "projects.update"));
		    }

		    var accountManagerRole = await _roleManager.FindByNameAsync("Account Manager");

		    if (accountManagerRole == null)
		    {
			    accountManagerRole = new IdentityRole("Account Manager");
			    await _roleManager.CreateAsync(accountManagerRole);

			    await _roleManager.AddClaimAsync(accountManagerRole, new Claim("Permission", "account.manage"));
		    }
		}
	}
}
