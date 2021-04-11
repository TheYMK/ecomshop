import axios from 'axios';
import { API_URL } from '../config';

export const getSubs = async () => {
	return await axios.get(`${API_URL}/subs`);
};

export const getSingleSub = async (slug) => {
	return await axios.get(`${API_URL}/sub/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
	return await axios.delete(`${API_URL}/sub/${slug}`, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const updateSub = async (sub, authtoken, slug) => {
	return await axios.put(`${API_URL}/sub/${slug}`, sub, {
		headers: {
			authtoken: authtoken
		}
	});
};

export const createSub = async (sub, authtoken) => {
	return await axios.post(`${API_URL}/sub`, sub, {
		headers: {
			authtoken: authtoken
		}
	});
};
