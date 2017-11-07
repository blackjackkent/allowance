using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BudgetingAPI
{
	using System.Text;
	using AutoMapper;
	using Infrastructure.Entities;
	using Infrastructure.Repositories;
	using Infrastructure.Repositories.Seeders;
	using Infrastructure.Services;
	using Microsoft.AspNetCore.Authentication.Cookies;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.IdentityModel.Tokens;

	public class Startup
    {
	    private IHostingEnvironment _env;
        private IConfigurationRoot _config { get; }

	    public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
	        _env = env;
            _config = builder.Build();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
	        services.AddSingleton(_config);
	        var connection = _config.GetConnectionString("AllowanceDb");
			services.AddDbContext<BudgetContext>(options =>
			{
				options.UseSqlServer(connection);
			});
	        services.AddScoped<IRepository<Budget>, BudgetRepository>();
	        services.AddScoped<IRepository<Transaction>, TransactionRepository>();
			services.AddScoped<IBudgetService, BudgetService>();
	        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
	        services.AddTransient<RoleInitializer>();
	        services.AddCors();
			services.AddMvc();
	        services.AddAutoMapper();

	        services.AddIdentity<BudgetUser, IdentityRole>(config =>
		        {
			        config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
			        {
				        OnRedirectToLogin = (ctx) =>
				        {
					        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
					        {
						        ctx.Response.StatusCode = 401;
					        }
					        return Task.CompletedTask;
				        },
				        OnRedirectToAccessDenied = (ctx) =>
				        {
					        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
					        {
						        ctx.Response.StatusCode = 403;
					        }
					        return Task.CompletedTask;
				        }
			        };
		        })
		        .AddEntityFrameworkStores<BudgetContext>();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, RoleInitializer roleInitializer)
        {
            loggerFactory.AddConsole(_config.GetSection("Logging"));
            loggerFactory.AddDebug();

	        app.UseIdentity();
	        app.UseJwtBearerAuthentication(new JwtBearerOptions
	        {
		        AutomaticAuthenticate = true,
		        AutomaticChallenge = true,
		        TokenValidationParameters = new TokenValidationParameters
		        {
			        ValidIssuer = _config["Tokens:Issuer"],
			        ValidAudience = _config["Tokens:Audience"],
			        ValidateIssuerSigningKey = true,
			        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"])),
			        ValidateLifetime = true
		        }
	        });
	        app.UseCors(builder =>
		        builder.WithOrigins("http://localhost:8080", "http://allowanceapp.azurewebsites.net").AllowAnyHeader().AllowAnyMethod());
			app.UseMvc();
	        roleInitializer.Seed().Wait();
        }
    }
}
