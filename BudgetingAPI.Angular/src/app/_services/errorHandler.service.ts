import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {
	constructor(private router: Router, private authService: AuthenticationService) { }

	handleError(res: Response): ErrorObservable {
		if (res.status === 401 || res.status === 403) {
			this.authService.logout();
			this.router.navigate(['login']);
		}
		return Observable.throw(res);
	}
}
