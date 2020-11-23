import axios from 'axios';
import { API_URL } from '../config';

export const getOrders = async (authtoken) => {
	return await axios.get(`${API_URL}/admin/orders`, {
		headers: {
			authtoken
		}
	});
};

export const changeOrderStatus = async (orderId, orderStatus, authtoken) => {
	return await axios.put(
		`${API_URL}/admin/order-status`,
		{ orderId, orderStatus },
		{
			headers: {
				authtoken
			}
		}
	);
};
