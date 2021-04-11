export const couponReducer = (state = false, action) => {
	switch (action.type) {
		case 'COUPON_APPLIED':
			return action.payload; //payload will contain all user information and then will be available in the global state
		default:
			return state;
	}
};
