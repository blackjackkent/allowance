namespace BudgetingAPI.Infrastructure.Services
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;
	using AutoMapper;
	using Models.DomainModels;
	using Repositories;

	public class BudgetService : IBudgetService
    {
	    public Budget GetBudget(string userId, int monthId, IRepository<Entities.Budget> budgetRepository, IRepository<Entities.Transaction> transactionRepository, IMapper mapper)
	    {
		    var entity = budgetRepository.GetSingle(b => b.UserId == userId);
		    if (entity == null)
		    {
			    return null;
		    }
		    var budget = mapper.Map<Entities.Budget, Budget>(entity);
		    var childEntities = transactionRepository.Get(t => t.BudgetId == budget.BudgetId && t.TransactionDate.Month == monthId).ToList();
		    budget.Transactions = mapper.Map<List<Entities.Transaction>, List<Transaction>>(childEntities);
		    return budget;
	    }

	    public async Task<Budget> CreateBudget(Budget budget, IRepository<Entities.Budget> budgetRepository, IMapper mapper)
	    {
		    var entity = mapper.Map<Entities.Budget>(budget);
			budgetRepository.Add(entity);
		    if (await budgetRepository.SaveAllAsync())
		    {
			    return mapper.Map<Budget>(entity);
		    }
		    return null;
	    }

	    public async Task<Budget> UpdateBudget(Budget budgetToUpdate, IRepository<Entities.Budget> budgetRepository, IMapper mapper)
	    {
		    var entity = budgetRepository.GetSingle(b => b.BudgetId == budgetToUpdate.BudgetId);
		    mapper.Map(budgetToUpdate, entity);
		    budgetRepository.Update(entity);
		    if (await budgetRepository.SaveAllAsync())
		    {
			    return mapper.Map<Budget>(entity);
		    }
		    return null;
		}

	    public async Task<Transaction> AddTransactionToBudget(Transaction transaction, Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper)
	    {
		    var entity = mapper.Map<Entities.Transaction>(transaction);
		    entity.BudgetId = budgetId;
		    transactionRepository.Add(entity);
		    if (await transactionRepository.SaveAllAsync())
		    {
			    return mapper.Map<Transaction>(entity);
		    }
		    return null;
		}

	    public IEnumerable<Transaction> GetTransactionsForBudget(Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper)
	    {
		    var entities = transactionRepository.Get(t => t.BudgetId == budgetId).ToList();
		    return mapper.Map<IEnumerable<Entities.Transaction>, IEnumerable<Transaction>>(entities);
		}

	    public Transaction GetTransaction(Guid id, Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper)
		{
			var entity = transactionRepository.GetSingle(t => t.TransactionId == id && t.BudgetId == budgetId);
			return entity == null ? null : mapper.Map<Entities.Transaction, Transaction>(entity);
		}

	    public async Task<Transaction> UpdateTransaction(Transaction transactionToUpdate, IRepository<Entities.Transaction> transactionRepository, IMapper mapper)
	    {
		    var entity = transactionRepository.GetSingle(b => b.TransactionId == transactionToUpdate.TransactionId);
		    mapper.Map(transactionToUpdate, entity);
		    transactionRepository.Update(entity);
		    if (await transactionRepository.SaveAllAsync())
		    {
			    return mapper.Map<Transaction>(entity);
		    }
		    return null;
		}

	    public async Task<bool> DeleteTransaction(Guid id, IRepository<Entities.Transaction> transactionRepository)
	    {
		    var entity = transactionRepository.GetSingle(b => b.TransactionId == id);
		    transactionRepository.Delete(entity);
		    if (await transactionRepository.SaveAllAsync())
		    {
			    return true;
		    }
		    return false;
		}

	    public bool BudgetHasTransaction(Guid budgetId, Guid transactionId, IRepository<Entities.Transaction> transactionRepository)
		{
			return transactionRepository.GetSingle(t => t.BudgetId == budgetId && t.TransactionId == transactionId) != null;
		}

	    public bool UserOwnsBudget(string userId, Guid budgetId, IRepository<Entities.Budget> budgetRepository)
	    {
		    return budgetRepository.GetSingle(b => b.BudgetId == budgetId && b.UserId == userId) != null;
	    }
    }
}
 