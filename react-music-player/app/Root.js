import React from 'react';
import {Provider} from 'react-redux';
import Routers from './routes/index';
import configureStore from './store/configureStore';
const store = configureStore();

// store.subscribe(() =>
//     //console.log('root store', store.getState())
// );

const Root = () => (
    <Provider store={store}>
        <Routers/>
    </Provider>
);

export default Root;
