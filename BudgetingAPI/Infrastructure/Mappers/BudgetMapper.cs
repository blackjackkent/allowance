namespace BudgetingAPI.Infrastructure.Mappers
{
	using AutoMapper;
	using Models.DomainModels;
	using Resolvers;

	public class BudgetMapper : Profile
    {
	    public BudgetMapper()
	    {
		    CreateMap<Budget, Entities.Budget>()
			    .ReverseMap()
			    .ForMember(s => s.ApiUrl, opt => opt.ResolveUsing<BudgetUrlResolver>());
		}
    }
}
