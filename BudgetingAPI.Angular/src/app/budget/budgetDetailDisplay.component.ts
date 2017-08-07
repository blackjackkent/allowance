import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from 'app/_services/budget.service';
import { Budget } from 'app/_models/budget';

@Component({
	selector: 'app-budget-detail-display',
	moduleId: module.id,
	templateUrl: 'budgetDetailDisplay.component.html',
	styleUrls: ['./budgetDetailDisplay.component.css']
})
export class BudgetDetailDisplayComponent {
	@Input() budget: Budget;

	constructor() { }
}
