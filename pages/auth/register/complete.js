import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { auth } from '../../../actions/firebase';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { Button } from 'antd';

function RegisterComplete() {
	const [ values, setValues ] = useState({
		email: '',
		password: '',
		loading: false
	});

	const { email, password, loading } = values;

	useEffect(() => {
		setValues({ ...values, email: window.localStorage.getItem('emailForRegistration') });
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		if (!email || !password) {
			toast.error('Email and password is required');
			setValues({ ...values, loading: false });
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long');
			setValues({ ...values, loading: false });
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(email, window.location.href);
			if (result.user.emailVerified) {
				// remove user email from local storage
				window.localStorage.removeItem('emailForRegistration');
				// get user id token
				let user = auth.currentUser;
				await user.updatePassword(password);

				const idTokenResult = await user.getIdTokenResult();

				// redux store
				console.log('user', user, 'idTokenResult', idTokenResult);
				// redirect
				Router.push('/');
			}
		} catch (err) {
			console.log(err);
			setValues({ ...values, loading: false });
			toast.error(err.message);
		}
	};

	const registerCompleteForm = () => (
		<form>
			<div className="form-group">
				<input type="email" className="form-control" value={email} disabled />
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setValues({ ...values, password: e.target.value })}
					placeholder="Enter your password..."
					autoFocus
				/>
			</div>

			<Button onClick={handleSubmit} type="primary" shape="round" block size="large" loading={loading}>
				Proceed
			</Button>
		</form>
	);

	return (
		<React.Fragment>
			<Layout>
				<div className="container p-5">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<h4 className="mb-5">Complete Registration</h4>
							{registerCompleteForm()}
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export default RegisterComplete;
