let initialState = [];

// load cart items from localstorage
// check if we have the window object. If yes we can access localstorage
if (typeof window !== 'undefined') {
	if (localStorage.getItem('cart')) {
		initialState = JSON.parse(localStorage.getItem('cart'));
	} else {
		initialState = [];
	}
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return action.payload; //payload will contain all user information and then will be available in the global state
		default:
			return state;
	}
};
