import { Budget } from '../_models/budget';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-total-row',
	templateUrl: './totalRow.component.html',
	styleUrls: ['./totalRow.component.css']
})
export class TotalRowComponent {
	@Input() budget: Budget;
}
