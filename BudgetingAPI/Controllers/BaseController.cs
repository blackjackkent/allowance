namespace BudgetingAPI.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.AspNetCore.Mvc.Filters;

	public class BaseController : Controller
	{
		public const string URL_HELPER = "URLHELPER";
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			base.OnActionExecuting(context);
			context.HttpContext.Items[URL_HELPER] = Url;
		}
	}
}