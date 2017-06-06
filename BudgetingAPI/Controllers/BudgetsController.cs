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
	    private readonly IBudgetService _budgetService;
	    private readonly IMapper _mapper;
	    private readonly ILogger<BudgetsController> _logger;
	    private readonly UserManager<Entities.BudgetUser> _userManager;

	    public BudgetsController(IRepository<Entities.Budget> budgetRepository, IBudgetService budgetService, IMapper mapper,
		    ILogger<BudgetsController> logger, UserManager<Entities.BudgetUser> userManager)
	    {
		    _budgetRepository = budgetRepository;
		    _budgetService = budgetService;
		    _mapper = mapper;
		    _logger = logger;
		    _userManager = userManager;
	    }

	    [HttpGet]
		[Route("")]
	    public async Task<IActionResult> Get()
		{
			try
			{
				var user = await _userManager.FindByNameAsync(User.Identity.Name);
				_logger.LogInformation($"Retrieving all budgets for user {user.Id}");
				var budgets = _budgetService.GetAllBudgets(user.Id, _budgetRepository, _mapper);
				return Ok(budgets);
			}
			catch (Exception e)
			{
				_logger.LogInformation($"Failed to retrieve all budgets: {e.Message}");
				return BadRequest(e);
			}
		}

	    [HttpGet("{id}", Name = "GetSingleBudget")]
	    public async Task<IActionResult> Get(Guid id)
	    {
			_logger.LogInformation($"Retrieving budget with ID {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
				var budget = _budgetService.GetBudget(id, user.Id, _budgetRepository, _mapper);
			    if (budget == null)
			    {
				    return NotFound();
			    }
			    return Ok(budget);
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error retrieving budget with ID {id}: {e.Message}");
			    return BadRequest(e);
		    }
	    }

		[HttpPost("")]
	    public async Task<IActionResult> Post([FromBody] Budget budget)
		{
			_logger.LogInformation($"Creating new budget");
			try
			{
				var user = await _userManager.FindByNameAsync(User.Identity.Name);
				if (user == null)
				{
					return Forbid();
				}
				budget.UserId = user.Id;
				var createdBudget = await _budgetService.CreateBudget(budget, _budgetRepository, _mapper);
				if (createdBudget != null)
				{
					return Created(createdBudget.ApiUrl, createdBudget);
				}
				return BadRequest();
			}
			catch (Exception e)
			{
				_logger.LogError($"Error creating budget: {e.Message}");
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



	    [HttpDelete("{id}")]
	    public async Task<IActionResult> Delete(Guid id)
	    {
		    _logger.LogInformation($"Updating transaction with id {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, id, _budgetRepository))
			    {
				    return Forbid();
			    }
			    var success = await _budgetService.DeleteBudget(id, _budgetRepository);
			    if (success)
			    {
				    return Ok();
			    }
			    return BadRequest();
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error updating transaction: {e.Message}");
			    return BadRequest(e);
		    }
	    }
	}
}
