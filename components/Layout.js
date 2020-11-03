import Header from './nav/Header';
import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../actions/firebase';
import { useDispatch } from 'react-redux';

function Layout({ children }) {
	const dispatch = useDispatch();

	// to check firebase auth state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				console.log('user', user);
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});
			}
		});

		// cleanup
		return () => unsubscribe();
	}, []);

	return (
		<React.Fragment>
			<Header />
			<ToastContainer />
			{children}
		</React.Fragment>
	);
}

export default Layout;
