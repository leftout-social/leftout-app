import axios from 'axios'
import Cookies from 'js-cookie';
import { ToastItem } from "~/components/Toast";
let token = Cookies.get('leftout-login');
const $axios = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// axiosRetry($axios, {
//     retries: 3, // number of retries
//     retryDelay: () => 10000,
//     retryCondition: () => true,
// });

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

export const responseInterceptor = (toastHandler: (item: ToastItem) => void) => {
    $axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if(error?.response?.status === 401) return removeCookieAndLogout();
            // originalRequest._retry = true;
            // if(error?.response?.status === 500 &&  !originalRequest._retry){
            //     originalRequest._retry = true;
            //     const accessToken = `Bearer ${token}`;
            //     if(!accessToken) removeCookieAndLogout();
            //     else $axios.defaults.headers.common['Authorization'] = accessToken;
            //     return $axios.request(originalRequest);
            // }
            toastHandler({open: true, message: 'Something went wrong', type: 'error'});
           return Promise.reject(error);
        }
    );
}

export const removeCookieAndLogout = () => {
    Cookies.remove('leftout-login');
    localStorage.clear();
    window.location.href = '/login'
}
export default $axios