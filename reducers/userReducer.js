export const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_IN_USER':
			return action.payload; //payload will contain all user information and then will be available in the global state
		case 'LOGOUT':
			return action.payload; //here we will make sure there is no more value in the state
		default:
			return state;
	}
};
