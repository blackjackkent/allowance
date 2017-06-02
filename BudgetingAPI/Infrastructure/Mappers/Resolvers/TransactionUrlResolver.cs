namespace BudgetingAPI.Infrastructure.Mappers.Resolvers
{
	using AutoMapper;
	using Controllers;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Models.DomainModels;

	public class TransactionUrlResolver : IValueResolver<Entities.Transaction, Transaction, string>
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public TransactionUrlResolver(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}
		public string Resolve(Entities.Transaction source, Transaction destination, string destMember, ResolutionContext context)
		{
			var url = (IUrlHelper)_httpContextAccessor.HttpContext.Items[BaseController.URL_HELPER];
			return url.Link("GetSingleTransaction", new { budgetId = source.BudgetId, id = source.TransactionId });
		}
	}
}
