import { Budget } from '../_models/budget';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'budgetDateDisplay' })
export class BudgetDateDisplayPipe implements PipeTransform {
	transform(value: Budget): string {
		const month = this.getMonthString(value);
		return `${month}, ${value.year}`;
	}

	private getMonthString(value: Budget) {
		var month = value.month;
		switch (month) {
			case 0: {
				return 'January';
			}
			case 1: {
				return 'February';
			}
			case 2: {
				return 'March';
			}
			case 3: {
				return 'April';
			}
			case 4: {
				return 'May';
			}
			case 5: {
				return 'June';
			}
			case 6: {
				return 'July';
			}
			case 7: {
				return 'August';
			}
			case 8: {
				return 'September';
			}
			case 9: {
				return 'October';
			}
			case 10: {
				return 'November';
			}
			case 11: {
				return 'December';
			}
			default:
				return '';
		}
	}
}
