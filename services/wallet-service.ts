import $axios from '../config/axios';

const _apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getWalletBalance = async() => {
    const response = await $axios.get(`${_apiBaseUrl}/wallet/balance`);
    return response.data.data.data;
}

export const updateWalletBalance = async(type: 'CREDIT' | 'DEBIT', amount: number) => {
    const response = await $axios.post(`${_apiBaseUrl}/wallet/update?type=${type}`, {
        amount
    });
    return response.data;
}