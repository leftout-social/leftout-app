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

export const reactOnFeed = async(feedId: any, userId: any, sourceId:any) => {
    const response = await $axios.post(`${_apiBaseUrl}/feed/activity/${feedId}`, {
        user_id: userId,
        source_id:sourceId,
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
    const commute = formState.commute.toUpperCase();
    const gender = formState.requiredGender.toUpperCase();
    const response = await $axios.post(`${_apiBaseUrl}/feed`, {
        user_id: userId,
        travel_start_date: formState.fromDate,
        travel_end_date: formState.toDate,
        travel_medium: commute,
        required_travellers: formState.groupSize,
        required_travellers_gender: gender,
        additional_description: formState.desc,
        travelling_to_location: formState.location,
        location_latitude: latitude,
        location_longitude: longitude,
    });
    return response.data;
}
export const getFeedByProfile = async() => {
    const response = await $axios.get(`${_apiBaseUrl}/profile/feed`);
    return response.data;
}
export const getFeedDetails = async(id: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/profile/feed/${id}`);
    return response.data;
}

export const connectInstagramAccount = async(userDetails: any) => {
    const response = await $axios.put(`${_apiBaseUrl}/profile`, {
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        current_age: userDetails.age,
        gender: userDetails.gender,
        current_location: userDetails.currentCity,
        insta_id: userDetails.instaId,
        user_bio: userDetails.bio,
        profile_image_url: userDetails.profile_image_url || ''
    })
    return response.data;
}
export const getSpecificColumn = async(userId: any, columnName: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/profile/${userId}/${columnName}`);
    return response.data;
}
export const getUpdates = async(userId: any) => {
    const response = await $axios.get(`${_apiBaseUrl}/notification/${userId}`);
    return response.data;

}
export const verifyEmail = async(token: any) => {
    const response = await axios.post(`${_apiBaseUrl}/verify/email?token=${token}`);
    return response.status;
}