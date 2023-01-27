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
    const response = await $axios.get(`${_apiBaseUrl}/user/detail/${id}`);
    return response.data
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

export const getAllFeeds = async(lat: any, long: any, pageNo: any = 1, pageSize: any = 20) => {
    const response = await $axios.get(`${_apiBaseUrl}/feed?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: {
            lat: lat,
            long: long
        }
    })
    return response.data;
}

export const reactOnFeed = async(feedId: any, userId: any) => {
    const response = await $axios.post(`${_apiBaseUrl}/feed/activity/${feedId}`, {
        user_id: userId
    })
    return response.data;
} 

export const getReactionOnFeed = async(feedId: any, userId: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/feed/activity/${feedId}?user_id=${userId}`, {
        validateStatus: (status) => [200, 404].includes(status),
    })
    return response.status;
}

export const createPost = async(
    userId:any, formState: any, latitude?: any, longitude?: any,
) => {
    const response = await $axios.post(`${_apiBaseUrl}/feed`, {
        user_id: userId,
        travel_start_date: formState.fromDate,
        travel_end_date: formState.toDate,
        travel_medium: formState.commute,
        required_travellers: formState.groupSize,
        required_travellers_gender: formState.requiredGender,
        additional_description: formState.desc,
        travelling_to_location: formState.location,
        location_latitude: latitude,
        location_longitude: longitude,
    });
}
export const getFeedByProfile = async() => {
    const response = await $axios.get(`${_apiBaseUrl}/profile/feed`);
    return response.data;
}
export const getFeedDetails = async(id: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/profile/feed/${id}`);
    return response.data;
}