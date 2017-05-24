namespace BudgetingAPI.Infrastructure.Mappers.Resolvers
{
	using System;
	using AutoMapper;
	using Controllers;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Models.DomainModels;

	public class BudgetUrlResolver : IValueResolver<Entities.MonthlyBudget, MonthlyBudget, string>
    {
	    private readonly IHttpContextAccessor _httpContextAccessor;

	    public BudgetUrlResolver(IHttpContextAccessor httpContextAccessor)
	    {
		    _httpContextAccessor = httpContextAccessor;
	    }
	    public string Resolve(Entities.MonthlyBudget source, MonthlyBudget destination, string destMember, ResolutionContext context)
	    {
		    var url = (IUrlHelper)_httpContextAccessor.HttpContext.Items[BaseController.URL_HELPER];
		    return url.Link("GetSingleBudget", new { id = source.MonthlyBudgetId });
	    }
	}
}
