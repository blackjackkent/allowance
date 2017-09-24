import AxiosHttp from './axiosHttp';

class UserApi {
	static getCurrentUser() {
		return AxiosHttp.get('http://localhost:32676/api/users')
			.then(function (response) {
				return response.data;
			});
	}
}

export default UserApi;
