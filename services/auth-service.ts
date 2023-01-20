import axios from "axios";
const _apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

let token;
if (typeof window !== 'undefined') {
    // Perform localStorage action
   token = localStorage.getItem('leftout-login');
}
const $axios = axios.create({
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export const login = async(data: any) => {
    const response = await axios.post(`${_apiBaseUrl}/login`, {
        email_id: data.email,
        password: data.password
    });
    return response.data;
}

export const signup = async(data: any) => {
    const response = await axios.post(`${_apiBaseUrl}/signup`, {
        email_id: data.email,
        password: data.password
    });
    return response.data;
}

export const onboard = async(data: any, id: any) => {
    const response = await $axios.post(`${_apiBaseUrl}/onboard`, {
        first_name: data.firstName,
        last_name: data.lastName,
        current_age: Number(data.age),
        gender: data.gender,
        current_location: data.currentCity,
        id: id
    })
    return response.data.data
}

export const getUserDetail = async(id: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/user/detail/${id}`)
    return response.data.data
}