import {
    TODO_LIST,
    TODO_TOGGLE,
    TODO_ADD,
    TODO_UPDATE,
    TODO_DELETE
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {

        case TODO_LIST:
            return action.payload ;

        case TODO_TOGGLE:
            return state.map(todo => {
                if (todo.id !== action.payload.id) {
                    return todo
                }

                return {
                    ...todo,
                    ...action.payload
                };
            });

        case TODO_ADD:
            return [...state , action.payload];

        case TODO_UPDATE:
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.todoItem = action.payload.todoItem;
                }
                return todo;
            });

        case TODO_DELETE:
            return state.filter(x => x.id !== action.payload);
            
        default:
            return state;
    }
}