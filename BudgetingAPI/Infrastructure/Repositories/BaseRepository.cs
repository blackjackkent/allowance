using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAPI.Infrastructure.Repositories
{
	using System.Linq.Expressions;
	using Entities;
	using Microsoft.EntityFrameworkCore;

	public class BaseRepository<T> : IRepository<T> where T : class, IEntity
	{
		private readonly BudgetContext _context;
		protected DbSet<T> DbSet;

		public BaseRepository(BudgetContext context)
		{
			_context = context;
		}

		public void Add(T entity)
		{
			_context.Add(entity);
		}

		public void Update(T entity)
		{
			_context.Update(entity);
		}

		public void Delete(T entity)
		{
			_context.Remove(entity);
		}

		public async Task<bool> SaveAllAsync()
		{
			return (await _context.SaveChangesAsync()) > 0;
		}

		public IEnumerable<T> Get(Expression<Func<T, bool>> filter)
		{
			return DbSet.Where(filter).ToList();
		}

		public T GetSingle(Expression<Func<T, bool>> filter)
		{
			return DbSet.FirstOrDefault(filter);
		}
	}
}
