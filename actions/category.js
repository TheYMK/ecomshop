import axios from 'axios';
import { API_URL } from '../config';

export const getCategories = async () => {
	return await axios.get(`${API_URL}/categories`);
};

export const getSingleCategory = async (slug) => {
	return await axios.get(`${API_URL}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
	return await axios.delete(`${API_URL}/category/${slug}`, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const updateCategory = async (category, authtoken, slug) => {
	return await axios.put(`${API_URL}/category/${slug}`, category, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const createCategory = async (category, authtoken) => {
	return await axios.post(`${API_URL}/category`, category, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const getCategorySubs = async (_id) => {
	return await axios.get(`${API_URL}/category/${_id}/subs`);
};
