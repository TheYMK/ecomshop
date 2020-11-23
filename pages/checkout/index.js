import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic'; // because we're gonna use a rich text editor and we only want it to work with the client not the server
import { QuillModules, QuillFormats } from '../../helpers/quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { Button } from 'antd';
import Router from 'next/router';

function CheckoutPage() {
	const [ values, setValues ] = useState({
		products: [],
		total: 0,
		addressSaved: false,
		coupon: '',
		loading: false,
		totalAfterDiscount: 0,
		discountError: '',
		discountSuccess: ''
	});

	const [ address, setAddress ] = useState('');

	const {
		products,
		total,
		addressSaved,
		coupon,
		loading,
		totalAfterDiscount,
		discountError,
		discountSuccess
	} = values;

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) {
			getUserCart(user.token)
				.then((res) => {
					console.log('getUserCart Response:', JSON.stringify(res.data, null, 4));
					setValues({ ...values, products: res.data.products, total: res.data.cart_total });
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const saveAddressToDB = () => {
		// console.log(address);
		saveUserAddress(user.token, address)
			.then((res) => {
				if (res.data.success) {
					setValues({ ...values, addressSaved: true });
					toast.success('Shipping address saved');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const emptyCart = () => {
		// remove from localStorage
		if (typeof window !== 'undefined') {
			localStorage.removeItem('cart');
		}
		// remove from redux
		dispatch({
			type: 'ADD_TO_CART',
			payload: []
		});
		// remove from backend
		emptyUserCart(user.token).then((res) => {
			setValues({ ...values, products: [], total: 0, totalAfterDiscount: 0, coupon: '' });
			toast.success('Cart is empty. Continue shopping.');
		});
	};

	const showAddress = () => {
		return (
			<React.Fragment>
				<ReactQuill
					modules={QuillModules}
					formats={QuillFormats}
					placeholder="Write something amazing..."
					value={address}
					onChange={setAddress}
				/>{' '}
				<button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
					Save
				</button>
			</React.Fragment>
		);
	};

	const showOrderSummary = () => {
		return (
			<React.Fragment>
				{products.map((p, index) => (
					<div key={index}>
						<p>
							{p.product.title} : ({p.color}) x {p.count} |{' '}
							{(p.product.price * p.count).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
						</p>
					</div>
				))}
			</React.Fragment>
		);
	};

	const applyDiscountCoupon = () => {
		applyCoupon(user.token, coupon)
			.then((res) => {
				console.log(`Res on coupon applied`, res.data);
				// error
				if (res.data.error) {
					// update redux coupon applied true or false
					dispatch({
						type: 'COUPON_APPLIED',
						payload: false
					});
					return setValues({ ...values, discountError: res.data.error });
				}

				if (res.data) {
					setValues({
						...values,
						totalAfterDiscount: res.data,
						discountError: '',
						discountSuccess: 'Coupon Applied'
					});

					// update redux coupon applied true or false
					dispatch({
						type: 'COUPON_APPLIED',
						payload: true
					});
				}
			})
			.catch((err) => {
				console.log(`Apply Coupon error: ${err.message}`);
				setValues({ ...values, discountError: err.message });
			});
	};

	const showApplyCouponForm = () => {
		return (
			<React.Fragment>
				<input
					className="form-control"
					type="text"
					value={coupon}
					placeholder="Write coupon code"
					onChange={(e) =>
						setValues({ ...values, coupon: e.target.value, discountError: '', discountSuccess: '' })}
				/>
				<Button
					onClick={applyDiscountCoupon}
					type="primary"
					className="mb-2 mt-2"
					shape="round"
					size="medium"
					loading={loading}
					disabled={!coupon}
				>
					Apply coupon
				</Button>
			</React.Fragment>
		);
	};

	const showError = () => {
		return discountError && <p className="text-danger p-2">{discountError}</p>;
	};
	const showSuccess = () => {
		return discountSuccess && <p className="text-success p-2">{discountSuccess}</p>;
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="container-fluid mt-5 mx-3">
					<div className="row">
						<div className="col-md-6">
							<h4>Delivery Address</h4>
							<br />
							<br />
							{showAddress()}
							<hr />
							<h4>Got Coupon?</h4>
							<br />
							{showApplyCouponForm()}
							{showError()}
							{showSuccess()}
						</div>
						<div className="col-md-6">
							<h4>Order Summary</h4>
							<hr />
							<p>{products.length} items</p>
							<hr />
							{showOrderSummary()}
							<hr />
							<h4>
								Cart Total:{' '}
								{total.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD'
								})}
							</h4>
							{totalAfterDiscount > 0 && (
								<p className="bg-success p-2">
									Discount Applied <br />
									Price after discount:{' '}
									{totalAfterDiscount.toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD'
									})}
								</p>
							)}

							<div className="row">
								<div className="col-md-6">
									<button
										className="btn btn-primary btn-raised"
										disabled={!addressSaved || !products.length}
										onClick={() => Router.push('/payment')}
									>
										Place Order
									</button>
								</div>
								<div className="col-md-6">
									<button
										className="btn btn-warning btn-raised"
										onClick={emptyCart}
										disabled={!products.length}
									>
										Empty Order
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export default CheckoutPage;
