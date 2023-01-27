import axios from 'axios'
import Cookies from 'js-cookie';
import axiosRetry from 'axios-retry';
let token = Cookies.get('leftout-login');
const $axios = axios.create({
    timeout: 10000,
});

axiosRetry($axios, {
    retries: 3, // number of retries
    retryDelay: () => 10000,
    retryCondition: () => true,
});

export const requestInterceptor = () => {
    $axios.interceptors.request.use((request) => {
        const bearerToken = `Bearer ${token}`;
        request.headers = {
            'Authorization': bearerToken,
            'X-request-source': 'leftout-app',
        }
        return request;
    }, (error) => Promise.reject(error));
}

export const responseInterceptor = () => {
    $axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error?.config;
            if(error?.response?.status === 401 &&  !originalRequest._retry){
                originalRequest._retry = true;
                const accessToken = `Bearer ${token}`;
                if(!accessToken) removeCookieAndLogout();
                else $axios.defaults.headers.common['Authorization'] = accessToken;
                return $axios(originalRequest);
            }
            return $axios.request(originalRequest);
        }
    );
}

export const removeCookieAndLogout = () => {
    Cookies.remove('leftout-login');
    localStorage.clear();
    window.location.href = '/login'
}
export default $axios