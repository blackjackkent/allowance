import axios from 'axios';
import promise from 'promise';
import ls from 'local-storage';

// Add a request interceptor 
var AxiosHttp = axios.create();
AxiosHttp.interceptors.request.use(function(config) {
    // Do something before request is sent 
    //If the header does not contain the token and the url not public, redirect to login  
    var accessToken = getAccessTokenFromStorage();

    //if token is found add it to the header
    if (accessToken) {
        if (config.method !== 'OPTIONS') {
            config.headers.authorization = 'Bearer ' + accessToken;
        }
    }
    return config;
}, function(error) {
    return promise.reject(error);
});

AxiosHttp.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (error.response.status === 401) {
        window.location.href = '/login';
        return;
    }
    return Promise.reject(error);
});

function getAccessTokenFromStorage() {
    return ls.get('budgetAccessToken');
}

export default AxiosHttp;