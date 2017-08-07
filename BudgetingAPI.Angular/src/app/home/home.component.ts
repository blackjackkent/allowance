import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'app/_services/budget.service';
import { Budget } from 'app/_models/budget';

@Component({
	moduleId: module.id,
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
	currentBudget: Budget;
	constructor(private budgetService: BudgetService) { }

	ngOnInit() {
		this.budgetService.getBudget()
			.subscribe(budget => {
				this.currentBudget = budget;
			});
	}
}
