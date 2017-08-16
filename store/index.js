import { createStore, compose, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
);

export default store;
