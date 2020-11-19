import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getUserCart, emptyUserCart } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function CheckoutPage() {
	const [ values, setValues ] = useState({
		products: [],
		total: 0
	});

	const { products, total } = values;
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

	const saveAddressToDB = () => {};

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
			setValues({ ...values, products: [], total: 0 });
			toast.success('Cart is empty. Continue shopping.');
		});
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
							textarea
							<button className="btn btn-primary mt-2" onClick={saveAddressToDB}>
								Save
							</button>
							<hr />
							<h4>Got Coupon?</h4>
							<br />
							coupon input and apply button
						</div>
						<div className="col-md-6">
							<h4>Order Summary</h4>
							<hr />
							<p>{products.length} items</p>
							<hr />
							{products.map((p, index) => (
								<div key={index}>
									<p>
										{p.product.title} : ({p.color}) x {p.count} | ${p.product.price * p.count}
									</p>
								</div>
							))}
							<hr />
							<h4>Cart Total: ${total}</h4>

							<div className="row">
								<div className="col-md-6">
									<button className="btn btn-primary btn-raised">Place Order</button>
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
