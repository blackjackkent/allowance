namespace BudgetingAPI.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using AutoMapper;
	using Infrastructure.Repositories;
	using Infrastructure.Services;
	using Entities = Infrastructure.Entities;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.Extensions.Logging;
	using Models.DomainModels;

	[Route("api/budgets")]
	public class BudgetsController : BaseController
    {
	    private readonly IRepository<Entities.MonthlyBudget> _budgetRepository;
	    private readonly IBudgetService _budgetService;
	    private readonly IMapper _mapper;
	    private readonly ILogger<BudgetsController> _logger;

	    public BudgetsController(IRepository<Entities.MonthlyBudget> budgetRepository, IBudgetService budgetService, IMapper mapper,
		    ILogger<BudgetsController> logger)
	    {
		    _budgetRepository = budgetRepository;
		    _budgetService = budgetService;
		    _mapper = mapper;
		    _logger = logger;
	    }

	    [HttpGet("")]
	    public IActionResult Get()
	    {
		    var budgets = _budgetService.GetAllBudgets(_budgetRepository, _mapper);
		    return Ok(budgets);
	    }

	    [HttpGet("{id}", Name = "GetSingleBudget")]
	    public IActionResult Get(Guid id)
	    {
			_logger.LogInformation($"Retrieving budget with ID {id}");
		    try
		    {
			    var budget = _budgetService.GetBudget(id, _budgetRepository, _mapper);
			    if (budget == null)
			    {
				    return NotFound();
			    }
			    return Ok(budget);
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error retrieving budget with ID {id}: {e.Message}");
		    }
		    return BadRequest();
	    }

		[HttpPost("")]
	    public async Task<IActionResult> Post([FromBody] MonthlyBudget budget)
		{
			var createdBudget = await _budgetService.CreateBudget(budget, _budgetRepository, _mapper);
		    if (createdBudget != null)
		    {
			    return Created(createdBudget.ApiUrl, createdBudget);
		    }
		    return BadRequest();
	    }
	}
}
