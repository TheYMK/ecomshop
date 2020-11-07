import axios from 'axios';
import { API_URL } from '../config';

export const createProduct = async (product, authtoken) => {
	return await axios.post(`${API_URL}/product`, product, {
		headers: {
			authtoken: authtoken
		}
	});
};
