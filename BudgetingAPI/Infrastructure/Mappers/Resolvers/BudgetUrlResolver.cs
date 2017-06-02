namespace BudgetingAPI.Infrastructure.Mappers.Resolvers
{
	using System;
	using AutoMapper;
	using Controllers;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Models.DomainModels;

	public class BudgetUrlResolver : IValueResolver<Entities.Budget, Budget, string>
    {
	    private readonly IHttpContextAccessor _httpContextAccessor;

	    public BudgetUrlResolver(IHttpContextAccessor httpContextAccessor)
	    {
		    _httpContextAccessor = httpContextAccessor;
	    }
	    public string Resolve(Entities.Budget source, Budget destination, string destMember, ResolutionContext context)
	    {
		    var url = (IUrlHelper)_httpContextAccessor.HttpContext.Items[BaseController.URL_HELPER];
		    return url.Link("GetSingleBudget", new { id = source.BudgetId });
	    }
	}
}
