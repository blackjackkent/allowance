﻿namespace BudgetingAPI.Controllers
{
	using System;
	using System.Linq;
	using System.Threading.Tasks;
	using AutoMapper;
	using Infrastructure.Repositories;
	using Infrastructure.Services;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.Extensions.Logging;
	using Models.DomainModels;

	[Route("api/budgets/{budgetId}/transactions")]
	[Authorize]
	public class TransactionsController : BaseController
    {
	    private readonly IBudgetService _budgetService;
	    private readonly IMapper _mapper;
	    private readonly ILogger<BudgetsController> _logger;
	    private readonly UserManager<Infrastructure.Entities.BudgetUser> _userManager;
	    private IRepository<Infrastructure.Entities.Transaction> _transactionRepository;
	    private IRepository<Infrastructure.Entities.Budget> _budgetRepository;

	    public TransactionsController(IBudgetService budgetService, IMapper mapper,
		    ILogger<BudgetsController> logger, UserManager<Infrastructure.Entities.BudgetUser> userManager, IRepository<Infrastructure.Entities.Transaction> transactionRepository, IRepository<Infrastructure.Entities.Budget> budgetRepository)
	    {
		    _budgetService = budgetService;
		    _mapper = mapper;
		    _logger = logger;
		    _userManager = userManager;
		    _transactionRepository = transactionRepository;
		    _budgetRepository = budgetRepository;
	    }

		[HttpGet("")]
	    public async Task<IActionResult> Get(Guid budgetId)
	    {
		    try
		    {
			    _logger.LogInformation($"Retrieving all transactions for budget {budgetId}");
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, budgetId, _budgetRepository))
			    {
				    return Forbid();
			    }
			    var transactions = _budgetService.GetTransactionsForBudget(budgetId, _transactionRepository, _mapper);
			    return Ok(transactions);
		    }
		    catch (Exception e)
			{
				_logger.LogError($"Error retrieving transactions for budget {budgetId}: {e.Message}");
				return BadRequest(e);
		    }
	    }

	    [HttpGet("{id}", Name = "GetSingleTransaction")]
	    public async Task<IActionResult> Get(Guid budgetId, Guid id)
	    {
		    _logger.LogInformation($"Retrieving transaction with ID {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, budgetId, _budgetRepository))
			    {
				    return NotFound();
			    }
			    var transaction = _budgetService.GetTransaction(id, budgetId, _transactionRepository, _mapper);
			    if (transaction != null)
			    {
					return Ok(transaction);
			    }
			    return NotFound();
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error retrieving transaction with ID {id}: {e.Message}");
			    return BadRequest(e);
		    }
	    }

	    [HttpPost]
	    public async Task<IActionResult> Post(Guid budgetId, [FromBody] Transaction transaction)
	    {
		    _logger.LogInformation($"Creating new transaction for budget {budgetId}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, budgetId, _budgetRepository))
			    {
				    return Forbid();
			    }
			    var createdTransaction = await _budgetService.AddTransactionToBudget(transaction, budgetId, _transactionRepository, _mapper);
			    if (createdTransaction != null)
			    {
				    return Created(createdTransaction.ApiUrl, createdTransaction);
			    }
			    return BadRequest();
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error creating transaction: {e.Message}");
			    return BadRequest(e);
		    }
	    }

	    [HttpPut("{id}")]
	    public async Task<IActionResult> Put(Guid budgetId, Guid id, [FromBody] Transaction transaction)
	    {
		    _logger.LogInformation($"Updating transaction with id {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, budgetId, _budgetRepository))
			    {
				    return Forbid();
			    }
			    if (!_budgetService.BudgetHasTransaction(budgetId, id, _transactionRepository))
			    {
				    return NotFound();
			    }
			    var updatedTransaction = await _budgetService.UpdateTransaction(transaction, _transactionRepository, _mapper);
			    if (updatedTransaction != null)
			    {
				    return Ok(updatedTransaction);
			    }
			    return BadRequest();
		    }
		    catch (Exception e)
		    {
			    _logger.LogError($"Error updating transaction: {e.Message}");
			    return BadRequest(e);
		    }
	    }

	    [HttpDelete("{id}")]
	    public async Task<IActionResult> Delete(Guid budgetId, Guid id)
	    {
		    _logger.LogInformation($"Updating transaction with id {id}");
		    try
		    {
			    var user = await _userManager.FindByNameAsync(User.Identity.Name);
			    if (!_budgetService.UserOwnsBudget(user.Id, budgetId, _budgetRepository))
			    {
				    return Forbid();
			    }
			    if (!_budgetService.BudgetHasTransaction(budgetId, id, _transactionRepository))
			    {
				    return NotFound();
			    }
			    var success = await _budgetService.DeleteTransaction(id, _transactionRepository);
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
