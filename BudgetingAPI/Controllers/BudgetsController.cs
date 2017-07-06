namespace BudgetingAPI.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using AutoMapper;
	using Infrastructure.Repositories;
	using Infrastructure.Services;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Identity;
	using Entities = Infrastructure.Entities;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.Extensions.Logging;
	using Models.DomainModels;

	[Route("api/budgets")]
	[Authorize]
	public class BudgetsController : BaseController
    {
	    private readonly IRepository<Entities.Budget> _budgetRepository;
	    private readonly IRepository<Entities.Transaction> _transactionRepository;
	    private readonly IBudgetService _budgetService;
	    private readonly IMapper _mapper;
	    private readonly ILogger<BudgetsController> _logger;
	    private readonly UserManager<Entities.BudgetUser> _userManager;

	    public BudgetsController(IRepository<Entities.Budget> budgetRepository, IRepository<Entities.Transaction> transactionRepository, IBudgetService budgetService, IMapper mapper,
		    ILogger<BudgetsController> logger, UserManager<Entities.BudgetUser> userManager)
	    {
		    _budgetRepository = budgetRepository;
		    _transactionRepository = transactionRepository;
		    _budgetService = budgetService;
		    _mapper = mapper;
		    _logger = logger;
		    _userManager = userManager;
	    }

	    [HttpGet("", Name = "GetSingleBudget")]
	    public async Task<IActionResult> Get()
	    {
			_logger.LogInformation($"Retrieving budget for user {User.Identity.Name}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    var currentDate = DateTime.UtcNow;
				var budget = _budgetService.GetBudget(user.Id, currentDate.Month, _budgetRepository, _transactionRepository, _mapper);
			    if (budget == null)
			    {
				    return NotFound();
			    }
			    return Ok(budget);
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error retrieving budget for user {User.Identity.Name}: {e.Message}");
			    return BadRequest(e);
		    }
	    }

	    [HttpPut("{id}")]
	    public async Task<IActionResult> Put(Guid id, [FromBody] Budget budget)
	    {
		    _logger.LogInformation($"Updating budget with id {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
				if (!_budgetService.UserOwnsBudget(user.Id, budget.BudgetId, _budgetRepository)) {
				    return NotFound();
			    }
			    var updatedBudget = await _budgetService.UpdateBudget(budget, _budgetRepository, _mapper);
			    if (updatedBudget != null)
			    {
				    return Ok(updatedBudget);
			    }
			    return BadRequest();
		    }
		    catch (Exception e)
			{
				_logger.LogError($"Error updating budget: {e.Message}");
				return BadRequest(e);
		    }
	    }
	}
}
