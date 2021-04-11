import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { cartDrawerReducer } from './cartDrawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	cartDrawer: cartDrawerReducer,
	coupon: couponReducer,
	cashOnDelivery: CODReducer
});

export default rootReducer;
