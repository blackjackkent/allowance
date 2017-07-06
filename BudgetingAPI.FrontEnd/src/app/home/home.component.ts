import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'app/_services/budget.service';
import { Budget } from 'app/_models/budget';

@Component({
	moduleId: module.id,
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
	budgets: Array<Budget> = [];
	currentBudget: Budget;
	constructor(private budgetService: BudgetService) { }

	ngOnInit() {
		this.budgetService.getAllBudgets()
			.subscribe(budgets => {
				this.budgets = budgets;
				const currentDate = new Date();
				this.currentBudget = budgets.find(
					b => b.month === currentDate.getMonth()
						&& b.year === currentDate.getFullYear()
				);
			});
	}

	generateCurrentBudget() {
		const currentDate = new Date();
		let budget = new Budget();
		budget.month = currentDate.getMonth();
		budget.year = currentDate.getFullYear();
		this.budgetService.createBudget(budget)
			.subscribe(budget => {
				this.currentBudget = budget;
			});
	}
}
