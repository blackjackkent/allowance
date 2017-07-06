import { AuthResponse } from 'app/_models/authResponse';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	public token: string;
	constructor(private http: Http) {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}

	login(username: string, password: string): Observable<boolean> {
		const headers: Headers = new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', });
		const options: RequestOptions = new RequestOptions({ headers: headers });
		return this.http.post('http://localhost:32676/api/auth/token',
			JSON.stringify({ username: username, password: password }), options)
			.map((response: Response) => {
				const authResponse: AuthResponse = response.json() as AuthResponse;
				const token = authResponse.token;
				if (token) {
					this.token = token;
					localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
					return true;
				} else {
					localStorage.setItem('currentUser', '');
					return false;
				}
			})
			.catch(e => Observable.throw('Invalid username or password.'));;
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('currentUser');
	}
}
