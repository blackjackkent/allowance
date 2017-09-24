namespace BudgetingAPI.Infrastructure.Mappers
{
	using System.Linq;
	using AutoMapper;
	using Models.DomainModels;
	using Resolvers;

	public class UserMapper : Profile
    {
	    public UserMapper()
	    {
		    CreateMap<User, Entities.BudgetUser>()
			    .ReverseMap();
		}
    }
}
