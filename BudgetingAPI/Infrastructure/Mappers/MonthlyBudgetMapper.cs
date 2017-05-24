namespace BudgetingAPI.Infrastructure.Mappers
{
	using AutoMapper;
	using Models.DomainModels;
	using Resolvers;

	public class MonthlyBudgetMapper : Profile
    {
	    public MonthlyBudgetMapper()
	    {
		    CreateMap<MonthlyBudget, Entities.MonthlyBudget>()
			    .ReverseMap()
			    .ForMember(s => s.ApiUrl, opt => opt.ResolveUsing<BudgetUrlResolver>());
	    }
    }
}
