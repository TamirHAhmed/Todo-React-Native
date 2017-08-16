import { AsyncStorage } from 'react-native'
import axios from 'axios';
import {
    TODO_LIST,
    TODO_TOGGLE,
    TODO_ADD,
    TODO_UPDATE,
    TODO_DELETE
} from './types';

import { API_URL, HEADERS } from './constants'


export const fetchTodoList = () => async dispatch => {
    try {
        let token = await AsyncStorage.getItem('token');

        let headers =  HEADERS(token);
        let response = await axios.get(`${API_URL}/api/todo`, 
        {
            headers: headers
        });

        dispatch({ type: TODO_LIST, payload: response.data});

    } catch (error) {
        console.log(error);
    }
};

export const todoToggle = (item) => async dispatch => {
    try {
        item.isDone = !item.isDone;

        let token = await AsyncStorage.getItem('token');

        let headers =  HEADERS(token);
        let response = await axios.put(`${API_URL}/api/todo/${item.id}`, 
            item,
            {headers: headers}
        );
        
        dispatch({ type: TODO_TOGGLE, payload: item});

    } catch (error) {
        console.log(error);
    }
};



export const todoAdd= (todoItem) => async dispatch => {
    try {
        let token = await AsyncStorage.getItem('token');

        let headers =  HEADERS(token);
        let response = await axios.post(`${API_URL}/api/todo`, 
            {todoItem: todoItem},
            {headers: headers}
        );

       dispatch({ type: TODO_ADD, payload: response.data});

    } catch (error) {
        console.log(error);
    }
};

export const todoUpdate = (item, todoChange) => async dispatch => {
    try {
        let todo = Object.assign({}, item);
        todo.todoItem = todoChange;
        let token = await AsyncStorage.getItem('token');

        let headers =  HEADERS(token);
        let response = await axios.put(`${API_URL}/api/todo/${item.id}`, 
            todo,
            {headers: headers}
        );
        
        dispatch({ type: TODO_UPDATE, payload: todo});

    } catch (error) {
        console.log(error);
    }
};

export const todoDelete = (id) => async dispatch => {
    try {
        let token = await AsyncStorage.getItem('token');

        let headers =  HEADERS(token);
        await axios.delete(`${API_URL}/api/todo/${id}`, 
            {headers: headers}
        );
        
        dispatch({ type: TODO_DELETE, payload: id});

    } catch (error) {
        console.log(error);
    }
};