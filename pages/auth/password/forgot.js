import React, { useState, useEffect } from 'react';
import { auth } from '../../../actions/firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout';
import Router from 'next/router';
import { Button } from 'antd';
import { FORGOT_PASSWORD_REDIRECT_URL } from '../../../config';

function ForgotPasswordPage() {
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
				url: FORGOT_PASSWORD_REDIRECT_URL,
				handleCodeInApp: true
			};

			const result = await auth.sendPasswordResetEmail(email, config);

			setValues({ ...values, email: '', loading: false });

			toast.success(`Check your email for password reset link`);
		} catch (err) {
			console.log(err);
			toast.error(err.message);
		}
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="container col-md-6 offset-md-3 p-5">
					<h4>Forgot Password</h4>

					<form onSubmit={handleSubmit}>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setValues({ ...values, email: e.target.value })}
							placeholder="Enter your email"
							autoFocus
						/>
						<br />
						<Button
							type="primary"
							className=""
							shape="round"
							block
							size="large"
							loading={loading}
							onClick={handleSubmit}
							disabled={!email}
						>
							Submit
						</Button>
					</form>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export default ForgotPasswordPage;
