import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Budget } from 'app/_models/budget';
import { ErrorHandlerService } from 'app/_services/errorHandler.service';

@Injectable()
export class BudgetService {
	constructor(private http: Http, private authenticationService: AuthenticationService,
		private errorHandler: ErrorHandlerService) { }

	getBudget(): Observable<Budget> {
		const headers: Headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
		const options: RequestOptions = new RequestOptions({ headers: headers });
		return this.http.get('http://localhost:32676/api/budgets', options)
			.map((response: Response) => response.json())
			.catch(e => this.errorHandler.handleError(e));
	}
}
