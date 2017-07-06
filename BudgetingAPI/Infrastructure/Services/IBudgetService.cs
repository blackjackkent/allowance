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
		Budget GetBudget(string userId, int monthId, IRepository<Entities.Budget> budgetRepository, IRepository<Entities.Transaction> transactionRepository, IMapper mapper);
		Task<Budget> CreateBudget(Budget budget, IRepository<Entities.Budget> budgetRepository, IMapper mapper);
		Task<Budget> UpdateBudget(Budget budgetToUpdate, IRepository<Entities.Budget> budgetRepository, IMapper mapper);
		Task<Transaction> AddTransactionToBudget(Transaction transaction, Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper);
		IEnumerable<Transaction> GetTransactionsForBudget(Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper);
		Transaction GetTransaction(Guid id, Guid budgetId, IRepository<Entities.Transaction> transactionRepository, IMapper mapper);
		Task<Transaction> UpdateTransaction(Transaction transaction, IRepository<Entities.Transaction> transactionRepository, IMapper mapper);
		Task<bool> DeleteTransaction(Guid id, IRepository<Entities.Transaction> transactionRepository);
		bool UserOwnsBudget(string userId, Guid budgetBudgetId, IRepository<Entities.Budget> budgetRepository);
		bool BudgetHasTransaction(Guid budgetId, Guid transactionId, IRepository<Entities.Transaction> transactionRepository);

	}
}
