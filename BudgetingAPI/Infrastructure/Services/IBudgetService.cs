using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAPI.Infrastructure.Services
{
	using AutoMapper;
	using Models.DomainModels;
	using Repositories;

	public interface IBudgetService
	{
		IEnumerable<MonthlyBudget> GetAllBudgets(IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper);

		MonthlyBudget GetBudget(Guid id, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper);

		Task<MonthlyBudget> CreateBudget(MonthlyBudget budget, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper);
		Task<MonthlyBudget> UpdateBudget(MonthlyBudget budgetToUpdate, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper);
	}
}
