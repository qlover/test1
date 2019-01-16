import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (initialState) => {
	// 创建一个 Redux store 来以存放应用中所有的 state
    return createStore(
        rootReducer,
        initialState,
        // compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension())
        composeEnhancers(applyMiddleware(thunk))
    );
};

export default configureStore;