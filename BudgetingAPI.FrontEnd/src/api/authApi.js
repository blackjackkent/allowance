import AxiosHttp from './axiosHttp';
import ls from 'local-storage';

class AuthApi {
	static login(submittedUsername, submittedPassword) {
		return AxiosHttp.post('http://localhost:32676/api/auth/token',
			{
				Username: submittedUsername,
				Password: submittedPassword
			})
			.then(function (response) {
				ls.set('budgetAccessToken', response.data.token);
			});
	}

	static logout() {
		ls.clear('budgetAccessToken');
	}
}

export default AuthApi;
