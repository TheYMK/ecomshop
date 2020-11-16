export const searchReducer = (state = { text: '' }, action) => {
	switch (action.type) {
		case 'SEARCH_QUERY':
			return { ...state, ...action.payload }; //payload will contain all user information and then will be available in the global state
		default:
			return state;
	}
};
