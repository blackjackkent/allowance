namespace BudgetingAPI.Infrastructure.Repositories
{
	using System;
	using System.Collections.Generic;
	using System.Linq.Expressions;
	using System.Threading.Tasks;
	using Entities;

	public interface IRepository<T> where T : IEntity
	{
		void Add(T entity);
		void Update(T entity);
	    void Delete(T entity);
	    Task<bool> SaveAllAsync();
		IEnumerable<T> Get(Expression<Func<T, bool>> filter);
		T GetSingle(Expression<Func<T, bool>> filter);
	}
}
