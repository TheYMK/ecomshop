import axios from 'axios';
import { API_URL } from '../config';

export const createProduct = async (product, authtoken) => {
	return await axios.post(`${API_URL}/product`, product, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const getProductByCount = async (count) => {
	return await axios.get(`${API_URL}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
	return await axios.delete(`${API_URL}/product/${slug}`, {
		headers: {
			authtoken
		}
	});
};

export const getSingleProduct = async (slug) => {
	return await axios.get(`${API_URL}/product/${slug}`);
};

export const getAllProducts = async () => {
	return await axios.get(`${API_URL}/products`);
};

export const updateProduct = async (slug, product, authtoken) => {
	return await axios.put(`${API_URL}/product/${slug}`, product, {
		headers: {
			authtoken
		}
	});
};
