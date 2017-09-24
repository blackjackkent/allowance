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

	[Route("api/users")]
	[Authorize]
	public class UsersController : BaseController
	{
		private readonly IMapper _mapper;
		private readonly ILogger<BudgetsController> _logger;
		private readonly UserManager<Entities.BudgetUser> _userManager;

		public UsersController(IMapper mapper,
			ILogger<BudgetsController> logger, UserManager<Entities.BudgetUser> userManager)
		{
			_mapper = mapper;
			_logger = logger;
			_userManager = userManager;
		}

		[HttpGet("", Name = "GetCurrentUser")]
		public async Task<IActionResult> Get()
		{
			_logger.LogInformation($"Retrieving account information for user {User.Identity.Name}");
			try
			{
				var userEntity = await _userManager.FindByNameAsync(User.Identity.Name);
				var user = _mapper.Map<Entities.BudgetUser, User>(userEntity);
				if (user == null)
				{
					return NotFound();
				}
				return Ok(user);
			}
			catch (Exception e)
			{
				_logger.LogError($"Error retrieving budget for user {User.Identity.Name}: {e.Message}");
				return BadRequest(e);
			}
		}
	}
}
