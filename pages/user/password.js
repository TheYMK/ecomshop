import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import { auth } from '../../actions/firebase';
import { getCurrentUser } from '../../actions/auth';
import UserNav from '../../components/nav/UserNav';
import { toast } from 'react-toastify';
import { Button } from 'antd';

function UserPasswordUpdatePage() {
	const [ values, setValues ] = useState({
		password: '',
		loading: false
	});

	const { password, loading } = values;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setValues({ ...values, password: '', loading: false });
				toast.success('Your password has been updated');
			})
			.catch((err) => {
				setValues({ ...values, loading: false });
				toast.error(err.message);
			});
	};

	const passwordUpdateForm = () => (
		<form>
			<div className="form-group">
				<label>Your new password</label>
				<input
					type="password"
					onChange={(e) => setValues({ ...values, password: e.target.value })}
					className="form-control"
					placeholder="Enter new password..."
					value={password}
					disabled={loading}
				/>
			</div>
			<Button
				onClick={handleSubmit}
				type="primary"
				className="mb-2"
				shape="round"
				size="medium"
				loading={loading}
				disabled={!password || password.length < 6}
			>
				Update Password
			</Button>
		</form>
	);

	return (
		<React.Fragment>
			<Layout>
				<Private>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<UserNav />
							</div>
							<div className="col">
								<h4>Password Update</h4>
								{passwordUpdateForm()}
							</div>
						</div>
					</div>
				</Private>
			</Layout>
		</React.Fragment>
	);
}

export default UserPasswordUpdatePage;
