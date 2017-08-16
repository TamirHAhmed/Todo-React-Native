import { AsyncStorage } from 'react-native';
import {
    SET_TOKEN,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

import { BASE_URL } from './constants';

export const authSetToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
};

export const authLogin = (email, password) => async dispatch => {
    try {
        dispatch({ type: LOGIN_USER });

        let formdata = new FormData();   
        formdata.append('grant_type', 'password');
        formdata.append('client_id', 'emailpass.client');
        formdata.append('client_secret', 'secret');
        formdata.append('username', email);
        formdata.append('password', password);
        formdata.append('scope', 'api');


        let response = await fetch(`${BASE_URL}/connect/Token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata
            });

        let responseJson = await response.json();

        if(responseJson.error)
             return dispatch({ type: LOGIN_FAIL });

        const authToken = `Bearer ${responseJson.access_token}`;

        //save in async storage
        await AsyncStorage.setItem('token', authToken);

        dispatch({ type: LOGIN_SUCCESS, payload:  authToken });

    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAIL });
    }
};

export const authLogout = () => async dispatch => {
    try {
        await AsyncStorage.setItem('token', '');
        dispatch({ type: LOGOUT });
    } catch(error) {
        console.log(error);
    }
};
