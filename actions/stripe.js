import axios from 'axios';
import { API_URL } from '../config';

export const createPaymentIntent = async (authtoken, coupon) => {
	return await axios.post(
		`${API_URL}/create-payment-intent`,
		{ couponApplied: coupon },
		{
			headers: {
				authtoken
			}
		}
	);
};
