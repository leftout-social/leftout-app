import axios from 'axios'
import Cookies from 'js-cookie';
let token = Cookies.get('leftout-login');
const $axios = axios.create({
    timeout: 10000,
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
            if (error?.response?.status === 401) {
                Cookies.remove('leftout-login');
                window.location.href = '/login';
                return $axios.request(originalRequest);
            } else {
                throw error;
            }
        }
    );
}

export default $axios