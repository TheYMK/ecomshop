import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../actions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { Button } from 'antd';

function CreateCouponPage() {
	const [ values, setValues ] = useState({
		name: '',
		expiry: new Date(),
		discount: '',
		loading: false,
		coupons: []
	});

	// redux
	const { user } = useSelector((state) => ({ ...state }));

	const { name, expiry, discount, loading, coupons } = values;

	useEffect(() => {
		loadCoupons();
	}, []);

	const loadCoupons = () => {
		return getCoupons()
			.then((res) => setValues({ ...values, coupons: res.data }))
			.catch((err) => console.log(`Get coupons error: ${err}`));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setValues({ ...values, loading: true });
		const coupon = {
			name: name,
			expiry: expiry.toString(),
			discount: discount
		};
		createCoupon(coupon, user.token)
			.then((res) => {
				setValues({ ...values, loading: false, name: '', discount: '', expiry: '' });
				toast.success(`${res.data.name} coupon has been created`);
				loadCoupons();
			})
			.catch((err) => {
				console.log(`create coupon error: ${err.message}`);
				setValues({ ...values, loading: false });
				toast.success(`${err.message}`);
			});
	};

	const handleDateChange = (date) => {
		setValues({ ...values, expiry: date });
	};

	const showCreateCouponForm = () => {
		return (
			<form>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setValues({ ...values, name: e.target.value })}
						value={name}
						autoFocus
						required
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Discount %</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setValues({ ...values, discount: e.target.value })}
						value={discount}
						required
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Expiry</label>
					<br />
					<DatePicker
						className="form-control"
						selected={expiry}
						value={expiry}
						required
						onChange={handleDateChange}
					/>
				</div>
				<Button
					onClick={handleSubmit}
					type="primary"
					className="mb-2"
					shape="round"
					size="medium"
					loading={loading}
					disabled={!name}
				>
					Save
				</Button>
			</form>
		);
	};

	const handleRemove = (couponId) => {
		setValues({ ...values, loading: true });
		if (window.confirm('Are you sure you want to delete this coupon?')) {
			removeCoupon(couponId, user.token)
				.then((res) => {
					getCoupons().then((cps) => setValues({ ...values, coupons: cps.data }));
					setValues({ ...values, loading: false });
					toast.success(`${cps.data.name} coupon has been deleted`);
				})
				.catch((err) => {
					console.log(`remove coupon error: ${err}`);
					setValues({ ...values, loading: false });
					toast.success(`${err.message}`);
				});
		}
	};

	return (
		<React.Fragment>
			<Layout>
				<Admin>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<AdminNav />
							</div>
							<div className="col">
								<h4>Coupon</h4>
								{showCreateCouponForm()}
								<hr />
								{loading ? (
									<LoadingOutlined />
								) : (
									<table className="table table-bordered">
										<thead className="thead-light">
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Expiry</th>
												<th scope="col">Discount</th>
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
											{coupons.map((coupon) => (
												<tr key={coupon._id}>
													<td>{coupon.name}</td>
													<td>{new Date(coupon.expiry).toLocaleDateString()}</td>
													<td>{coupon.discount}%</td>
													<td>
														<DeleteOutlined
															onClick={() => handleRemove(coupon._id)}
															className="text-danger"
															style={{ cursor: 'pointer' }}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default CreateCouponPage;
