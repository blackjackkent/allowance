using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using BudgetingAPI.Infrastructure.Entities;
using BudgetingAPI.Models;

namespace BudgetingAPI.Migrations
{
    [DbContext(typeof(BudgetContext))]
    [Migration("20170524011706_TransactionStructure")]
    partial class TransactionStructure
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BudgetingAPI.Infrastructure.Entities.MonthlyBudget", b =>
                {
                    b.Property<Guid>("MonthlyBudgetId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Month");

                    b.Property<decimal>("Savings");

                    b.Property<int>("Year");

                    b.HasKey("MonthlyBudgetId");

                    b.ToTable("MonthlyBudgets");
                });

            modelBuilder.Entity("BudgetingAPI.Infrastructure.Entities.Transaction", b =>
                {
                    b.Property<Guid>("TransactionId")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BudgetMonthlyBudgetId");

                    b.Property<DateTime>("TransactionDate");

                    b.Property<string>("TransactionName");

                    b.Property<int>("TransactionType");

                    b.Property<decimal>("Value");

                    b.HasKey("TransactionId");

                    b.HasIndex("BudgetMonthlyBudgetId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BudgetingAPI.Infrastructure.Entities.Transaction", b =>
                {
                    b.HasOne("BudgetingAPI.Infrastructure.Entities.MonthlyBudget", "Budget")
                        .WithMany("Transactions")
                        .HasForeignKey("BudgetMonthlyBudgetId");
                });
        }
    }
}
