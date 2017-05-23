using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetingAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MonthlyBudgets",
                columns: table => new
                {
                    MonthlyBudgetId = table.Column<Guid>(nullable: false),
                    Month = table.Column<int>(nullable: false),
                    Savings = table.Column<decimal>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyBudgets", x => x.MonthlyBudgetId);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<Guid>(nullable: false),
                    MonthlyBudgetId = table.Column<Guid>(nullable: true),
                    MonthlyBudgetId1 = table.Column<Guid>(nullable: true),
                    MonthlyBudgetId2 = table.Column<Guid>(nullable: true),
                    TransactionDate = table.Column<DateTime>(nullable: false),
                    TransactionName = table.Column<string>(nullable: true),
                    Value = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId",
                        column: x => x.MonthlyBudgetId,
                        principalTable: "MonthlyBudgets",
                        principalColumn: "MonthlyBudgetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId1",
                        column: x => x.MonthlyBudgetId1,
                        principalTable: "MonthlyBudgets",
                        principalColumn: "MonthlyBudgetId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId2",
                        column: x => x.MonthlyBudgetId2,
                        principalTable: "MonthlyBudgets",
                        principalColumn: "MonthlyBudgetId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_MonthlyBudgetId",
                table: "Transactions",
                column: "MonthlyBudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_MonthlyBudgetId1",
                table: "Transactions",
                column: "MonthlyBudgetId1");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_MonthlyBudgetId2",
                table: "Transactions",
                column: "MonthlyBudgetId2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "MonthlyBudgets");
        }
    }
}
