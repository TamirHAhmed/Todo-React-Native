export const BASE_URL = 'http://192.168.43.73:5000';
export const API_URL = 'http://192.168.43.73:5001';

export const HEADERS = (token) => {
    return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        };
};