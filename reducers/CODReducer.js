export const CODReducer = (state = false, action) => {
	switch (action.type) {
		case 'SET_CASH_ON_DELIVERY':
			return action.payload; //payload will contain all user information and then will be available in the global state
		default:
			return state;
	}
};
