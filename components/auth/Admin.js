import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import LoadingToRedirect from '../LoadingToRedirect';
import { getCurrentAdmin } from '../../actions/auth';

function Admin({ children }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [ accessGranted, setAccessGranted ] = useState(false);

	useEffect(
		() => {
			if (user && user.token) {
				getCurrentAdmin(user.token)
					.then((res) => {
						setAccessGranted(true);
					})
					.catch((err) => {
						console.log('ADMIN ROUTER ERROR', err);
						setAccessGranted(false);
					});
			}
		},
		[ user ]
	);

	return accessGranted ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<React.Fragment>
			<LoadingToRedirect />
		</React.Fragment>
	);
}

export default Admin;
