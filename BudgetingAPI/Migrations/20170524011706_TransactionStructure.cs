using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetingAPI.Migrations
{
    public partial class TransactionStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId1",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId2",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_MonthlyBudgetId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_MonthlyBudgetId1",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "MonthlyBudgetId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "MonthlyBudgetId1",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "MonthlyBudgetId2",
                table: "Transactions",
                newName: "BudgetMonthlyBudgetId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_MonthlyBudgetId2",
                table: "Transactions",
                newName: "IX_Transactions_BudgetMonthlyBudgetId");

            migrationBuilder.AddColumn<int>(
                name: "TransactionType",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_MonthlyBudgets_BudgetMonthlyBudgetId",
                table: "Transactions",
                column: "BudgetMonthlyBudgetId",
                principalTable: "MonthlyBudgets",
                principalColumn: "MonthlyBudgetId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_MonthlyBudgets_BudgetMonthlyBudgetId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionType",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "BudgetMonthlyBudgetId",
                table: "Transactions",
                newName: "MonthlyBudgetId2");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_BudgetMonthlyBudgetId",
                table: "Transactions",
                newName: "IX_Transactions_MonthlyBudgetId2");

            migrationBuilder.AddColumn<Guid>(
                name: "MonthlyBudgetId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MonthlyBudgetId1",
                table: "Transactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_MonthlyBudgetId",
                table: "Transactions",
                column: "MonthlyBudgetId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_MonthlyBudgetId1",
                table: "Transactions",
                column: "MonthlyBudgetId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId",
                table: "Transactions",
                column: "MonthlyBudgetId",
                principalTable: "MonthlyBudgets",
                principalColumn: "MonthlyBudgetId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId1",
                table: "Transactions",
                column: "MonthlyBudgetId1",
                principalTable: "MonthlyBudgets",
                principalColumn: "MonthlyBudgetId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_MonthlyBudgets_MonthlyBudgetId2",
                table: "Transactions",
                column: "MonthlyBudgetId2",
                principalTable: "MonthlyBudgets",
                principalColumn: "MonthlyBudgetId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
