import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from 'app/_services/budget.service';
import { Budget } from 'app/_models/budget';

@Component({
	selector: 'app-budget-detail-display',
	moduleId: module.id,
	templateUrl: 'budgetDetailDisplay.component.html'
})
export class BudgetDetailDisplayComponent implements OnInit {
	@Input() budget: Budget;
	budgetIncomeTotal: number;
	budgetBillsTotal: number;
	budgetExpensesTotal: number;

	constructor(private budgetService: BudgetService) { }

	ngOnInit() {

	}
}
