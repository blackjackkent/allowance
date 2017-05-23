using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using BudgetingAPI.Infrastructure.Entities;

namespace BudgetingAPI.Migrations
{
    [DbContext(typeof(BudgetContext))]
    partial class BudgetContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<Guid?>("MonthlyBudgetId");

                    b.Property<Guid?>("MonthlyBudgetId1");

                    b.Property<Guid?>("MonthlyBudgetId2");

                    b.Property<DateTime>("TransactionDate");

                    b.Property<string>("TransactionName");

                    b.Property<decimal>("Value");

                    b.HasKey("TransactionId");

                    b.HasIndex("MonthlyBudgetId");

                    b.HasIndex("MonthlyBudgetId1");

                    b.HasIndex("MonthlyBudgetId2");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BudgetingAPI.Infrastructure.Entities.Transaction", b =>
                {
                    b.HasOne("BudgetingAPI.Infrastructure.Entities.MonthlyBudget")
                        .WithMany("Bills")
                        .HasForeignKey("MonthlyBudgetId");

                    b.HasOne("BudgetingAPI.Infrastructure.Entities.MonthlyBudget")
                        .WithMany("Expenses")
                        .HasForeignKey("MonthlyBudgetId1");

                    b.HasOne("BudgetingAPI.Infrastructure.Entities.MonthlyBudget")
                        .WithMany("Income")
                        .HasForeignKey("MonthlyBudgetId2");
                });
        }
    }
}
