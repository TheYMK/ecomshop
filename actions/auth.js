import axios from 'axios';
import { API_URL } from '../config';

export const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${API_URL}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken: authtoken
			}
		}
	);
};

export const getCurrentUser = async (authtoken) => {
	return await axios.post(
		`${API_URL}/current-user`,
		{},
		{
			headers: {
				authtoken: authtoken
			}
		}
	);
};

export const getCurrentAdmin = async (authtoken) => {
	return await axios.post(
		`${API_URL}/current-admin`,
		{},
		{
			headers: {
				authtoken: authtoken
			}
		}
	);
};
