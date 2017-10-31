namespace BudgetingAPI.Infrastructure.Mappers
{
	using System.Linq;
	using AutoMapper;
	using Models.DomainModels;
	using Resolvers;

	public class BudgetMapper : Profile
    {
	    public BudgetMapper()
	    {
		    CreateMap<Budget, Entities.Budget>()
				.ForMember(d => d.Transactions, opt => opt.Ignore())
			    .ReverseMap()
			    .ForMember(d => d.ApiUrl, opt => opt.ResolveUsing<BudgetUrlResolver>());
		}
    }
}
