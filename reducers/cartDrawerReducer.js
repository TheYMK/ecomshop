export const cartDrawerReducer = (state = false, action) => {
	switch (action.type) {
		case 'SET_VISIBLE':
			return action.payload; //payload will contain all user information and then will be available in the global state
		default:
			return state;
	}
};
