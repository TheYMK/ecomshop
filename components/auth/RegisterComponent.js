import React, { useState, useEffect } from 'react';
import { auth } from '../../actions/firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { REGISTER_REDIRECT_URL } from '../../config';

function RegisterComponent() {
	const [ values, setValues ] = useState({
		email: '',
		loading: false
	});
	const { user } = useSelector((state) => ({ ...state }));

	const { email, loading } = values;

	useEffect(
		() => {
			if (user && user.token) {
				Router.push('/');
			}
		},
		[ user ]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		try {
			const config = {
				url: REGISTER_REDIRECT_URL,
				handleCodeInApp: true
			};

			await auth.sendSignInLinkToEmail(email, config);
			toast.success(`Email is sent to ${email}. Click the link to complete your registration`);

			// save user email in local storage
			window.localStorage.setItem('emailForRegistration', email);

			setValues({ ...values, email: '', loading: false });
		} catch (err) {
			console.log(err);
			toast.error(err.message);
		}
	};

	const registerForm = () => (
		<form>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setValues({ ...values, email: e.target.value, loading: false })}
					placeholder="Enter an email..."
					autoFocus
				/>
			</div>

			<Button onClick={handleSubmit} type="primary" shape="round" block size="large" loading={loading}>
				Register
			</Button>
		</form>
	);

	return (
		<React.Fragment>
			<div className="container p-5">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h4>Register</h4>
						<p>Welcome to join the ecomshop community. Together, let's reinvent the shopping.</p>
						{registerForm()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default RegisterComponent;
