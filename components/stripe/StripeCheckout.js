import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../actions/stripe';
import { createOrder, emptyUserCart } from '../../actions/user';
import Router from 'next/router';
import Link from 'next/link';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';

const cartStyle = {
	base: {
		color: '#32325d',
		fontFamily: 'Arial, sans-serif',
		fontSmoothing: 'antialiased',
		fontSize: '16px',
		'::placeholder': {
			color: '#32325d'
		}
	},
	invalid: {
		fontFamily: 'Arial, sans-serif',
		color: '#fa755a',
		iconColor: '#fa755a'
	}
};

function StripeCheckout() {
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => ({ ...state }));

	const [ values, setValues ] = useState({
		succeeded: false,
		error: null,
		processing: '',
		disabled: true,
		clientSecret: '',
		cartTotal: 0,
		totalAfterDiscount: 0,
		payable: 0
	});

	const { succeeded, error, processing, disabled, clientSecret, cartTotal, totalAfterDiscount, payable } = values;

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (user && user.token) {
			createPaymentIntent(user.token, coupon).then((res) => {
				console.log(`create payment intent`, res.data);
				setValues({
					...values,
					clientSecret: res.data.clientSecret,
					cartTotal: res.data.cart_total,
					totalAfterDiscount: res.data.total_after_discount,
					payable: res.data.payable
				});
			});
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setValues({ ...values, processing: true });

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value
				}
			}
		});

		if (payload.error) {
			setValues({ ...values, error: `Payment failed: ${payload.error.message}`, processing: false });
		} else {
			// payment successful at this stage
			// create order and save in database for admin to process
			createOrder(payload, user.token)
				.then((res) => {
					if (res.data.success) {
						// empty user cart from local storage
						if (typeof window !== 'undefined') localStorage.removeItem('cart');
						// empty user cart from redux
						dispatch({
							type: 'ADD_TO_CART',
							payload: []
						});
						// reset coupon to false
						dispatch({
							type: 'COUPON_APPLIED',
							payload: false
						});
						// empty cart from db
						emptyUserCart(user.token);
					}
				})
				.catch();

			// console.log(JSON.stringify(payload, null, 4));
			setValues({ ...values, error: null, processing: false, succeeded: true });
		}
	};

	const handleChange = async (e) => {
		setValues({ ...values, disabled: e.empty, error: e.error ? e.error.message : '' });
	};

	return (
		<React.Fragment>
			{!succeeded && (
				<div>
					{coupon && totalAfterDiscount !== undefined ? (
						<p className="alert alert-success">{`Total after discount: ${totalAfterDiscount.toLocaleString(
							'en-US',
							{
								style: 'currency',
								currency: 'USD'
							}
						)}`}</p>
					) : (
						<p className="text-danger">No coupon applied</p>
					)}
				</div>
			)}

			<div className="text-center pb-5">
				<Card
					cover={
						<img
							src={'/static/images/bg_6.jpg'}
							style={{ height: '100px', objectFit: 'cover', marginBottom: '-50px' }}
						/>
					}
					actions={[
						<React.Fragment>
							<DollarOutlined className="text-info" /> <br /> Total:{' '}
							{cartTotal.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
						</React.Fragment>,
						<React.Fragment>
							<CheckOutlined className="text-info" /> <br /> Total Payable:{' '}
							{(payable / 100).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})}
						</React.Fragment>
					]}
				/>
			</div>

			<form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
				<CardElement id="card-element" options={cartStyle} onChange={handleChange} />
				<button className="stripe-button" disabled={processing || disabled || succeeded}>
					<span id="button-text">{processing ? <div className="spinner" id="spinner" /> : 'Pay'}</span>
				</button>
				<br />
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
				<p className={succeeded ? 'result-message' : 'result-message hidden'}>
					Payment Successful.<Link href="/user/history">View your purchase history</Link>
				</p>
			</form>
		</React.Fragment>
	);
}

export default StripeCheckout;
