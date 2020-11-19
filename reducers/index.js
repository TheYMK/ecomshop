import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { cartDrawerReducer } from './cartDrawerReducer';

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	cartDrawer: cartDrawerReducer
});

export default rootReducer;
