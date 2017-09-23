import axios from 'axios';
import promise from 'promise';
import ls from 'local-storage';

// Add a request interceptor
const whitelist = [
	'api/auth'
];
var AxiosHttp = axios.create();
AxiosHttp.interceptors.request.use(function (config) {
	if (whitelist.some(function (path) { return config.url.indexOf(path) >= 0; })) {
		return config;
	}
	var accessToken = getAccessTokenFromStorage();
	if (accessToken) {
		if (config.method !== 'OPTIONS') {
			config.headers.authorization = 'Bearer ' + accessToken;
		}
	}
	return config;
}, function (error) {
	return promise.reject(error);
});

AxiosHttp.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 401) {
		window.location.href = '/login';
		return Promise.reject(error);
	}
	return Promise.reject(error);
});

function getAccessTokenFromStorage() {
	return ls.get('budgetAccessToken');
}

export default AxiosHttp;
