import axios from "axios";
import $axios from '../config/axios';

const _apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    return response.data;
}

export const getUserDetail = async(id: any) => {
    return await $axios.get(`${_apiBaseUrl}/user/detail/${id}`);
}
export const forgotPasswordWithEmail = async(email: any) => {
    const response = await axios.post(`${_apiBaseUrl}/forgot`, {
        email_id: email
    })
    return response.data;
}

export const resetPassword = async(data: any) => {
    const response = await axios.post(`${_apiBaseUrl}/reset/password`, data)
    return response.data;
}