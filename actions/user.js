import axios from 'axios';
import { API_URL } from '../config';

export const userCart = async (cart, authtoken) => {
	// {cart} we use curly braces so that it will be available as req.body.cart instead of req.body
	// or we can also pass it as object in parameters we calling this function
	return await axios.post(
		`${API_URL}/user/cart`,
		{ cart },
		{
			headers: {
				authtoken
			}
		}
	);
};

export const getUserCart = async (authtoken) => {
	// {cart} we use curly braces so that it will be available as req.body.cart instead of req.body
	// or we can also pass it as object in parameters we calling this function
	return await axios.get(`${API_URL}/user/cart`, {
		headers: {
			authtoken
		}
	});
};

export const emptyUserCart = async (authtoken) => {
	return await axios.delete(`${API_URL}/user/cart`, {
		headers: {
			authtoken
		}
	});
};

export const saveUserAddress = async (authtoken, address) => {
	return await axios.post(
		`${API_URL}/user/address`,
		{ address },
		{
			headers: {
				authtoken
			}
		}
	);
};

export const applyCoupon = async (authtoken, coupon) => {
	return await axios.put(
		`${API_URL}/user/cart/coupon`,
		{ coupon },
		{
			headers: {
				authtoken
			}
		}
	);
};

export const createOrder = async (stripeResponse, authtoken) => {
	return await axios.post(
		`${API_URL}/user/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken
			}
		}
	);
};
