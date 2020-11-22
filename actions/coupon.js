import axios from 'axios';
import { API_URL } from '../config';

export const getCoupons = async () => {
	return await axios.get(`${API_URL}/coupons`);
};

export const removeCoupon = async (coupon_id, authtoken) => {
	return await axios.delete(`${API_URL}/coupon/${coupon_id}`, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const createCoupon = async (coupon, authtoken) => {
	return await axios.post(
		`${API_URL}/coupon`,
		{ coupon },
		{
			headers: {
				authtoken: authtoken
			}
		}
	);
};
