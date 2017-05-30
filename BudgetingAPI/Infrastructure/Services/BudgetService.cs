namespace BudgetingAPI.Infrastructure.Services
{
	using System;
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using AutoMapper;
	using Models.DomainModels;
	using Repositories;

	public class BudgetService : IBudgetService
    {
	    public IEnumerable<MonthlyBudget> GetAllBudgets(IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper)
	    {
		    var entities =  budgetRepository.Get(b => b != null);
		    return mapper.Map<IEnumerable<Entities.MonthlyBudget>, IEnumerable<MonthlyBudget>>(entities);
	    }

	    public MonthlyBudget GetBudget(Guid id, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper)
	    {
		    var entity = budgetRepository.GetSingle(b => b.MonthlyBudgetId == id);
		    return entity == null ? null : mapper.Map<Entities.MonthlyBudget, MonthlyBudget>(entity);
	    }

	    public async Task<MonthlyBudget> CreateBudget(MonthlyBudget budget, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper)
	    {
		    var entity = mapper.Map<Entities.MonthlyBudget>(budget);
			budgetRepository.Add(entity);
		    if (await budgetRepository.SaveAllAsync())
		    {
			    return mapper.Map<MonthlyBudget>(entity);
		    }
		    return null;
	    }

	    public async Task<MonthlyBudget> UpdateBudget(MonthlyBudget budgetToUpdate, IRepository<Entities.MonthlyBudget> budgetRepository, IMapper mapper)
	    {
		    var entity = mapper.Map<Entities.MonthlyBudget>(budgetToUpdate);
		    budgetRepository.Update(entity);
		    if (await budgetRepository.SaveAllAsync())
		    {
			    return mapper.Map<MonthlyBudget>(entity);
		    }
		    return null;
		}
    }
}
