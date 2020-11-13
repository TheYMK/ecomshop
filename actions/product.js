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

// this was supposed to be used in getstaticpaths function
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

export const getProducts = async (sort, order, page) => {
	return await axios.post(`${API_URL}/products/all`, { sort: sort, order: order, page: page });
};

export const getProductsTotalCount = async () => {
	return await axios.get(`${API_URL}/products/total`);
};

export const productStarRating = async (product_id, rating, authtoken) => {
	return await axios.put(`${API_URL}/product/star/${product_id}`, rating, {
		headers: {
			authtoken
		}
	});
};

export const getRelatedProducts = async (product_id) => {
	return await axios.get(`${API_URL}/product/related/${product_id}`);
};
