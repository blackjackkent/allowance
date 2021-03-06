﻿namespace BudgetingAPI.Infrastructure.Mappers
{
	using AutoMapper;
	using Models.DomainModels;
	using Resolvers;

	public class TransactionMapper : Profile
    {
	    public TransactionMapper()
	    {
		    CreateMap<Transaction, Entities.Transaction>()
			    .ReverseMap()
			    .ForMember(d => d.ApiUrl, opt => opt.ResolveUsing<TransactionUrlResolver>());
		}
    }
}
