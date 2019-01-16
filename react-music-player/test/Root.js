import React from 'react';
import {Provider} from 'react-redux';
import Routers from './routes/index';

import rootReducer from './reducers/index';
import {createStore, applyMiddleware, compose} from 'redux';
const store = createStore(
    rootReducer,
    {},
)

store.subscribe(() =>
    console.log('root store', store.getState())
);

const Root = () => (
    <Provider store={store}>
        <Routers/>
    </Provider>
);

export default Root;
