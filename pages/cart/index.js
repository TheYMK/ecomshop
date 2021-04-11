import React from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import ProductCheckoutCard from '../../components/cards/ProductCheckoutCard';
import Router from 'next/router';
import { userCart } from '../../actions/user';

function CartPage() {
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const getTotal = () => {
		return cart.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const saveOrderToDB = () => {
		// console.log('cart', JSON.stringify(cart, null, 4));
		userCart(cart, user.token)
			.then((res) => {
				console.log('Cart Post Res', res);
				if (res.data.success) {
					Router.push('/checkout');
				}
			})
			.catch((err) => console.log(`Cart Save Err`, err));
	};

	const saveCashOrderToDB = () => {
		dispatch({
			type: 'SET_CASH_ON_DELIVERY',
			payload: true
		});
		userCart(cart, user.token)
			.then((res) => {
				console.log('Cart Post Res', res);
				if (res.data.success) {
					Router.push('/checkout');
				}
			})
			.catch((err) => console.log(`Cart Save Err`, err));
	};

	const showCartItems = () => {
		return (
			<div className="table-responsive">
				<table className="table table-bordered">
					<thead className="thead-light">
						<tr>
							<th scope="col">Image</th>
							<th scope="col">Title</th>
							<th scope="col">Price</th>
							<th scope="col">Brand</th>
							<th scope="col">Color</th>
							<th scope="col">Count</th>
							<th scope="col">Shipping</th>
							<th scope="col">Remove</th>
						</tr>
					</thead>

					{cart.map((product) => <ProductCheckoutCard key={product._id} product={product} />)}
				</table>
			</div>
		);
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="container-fluid pt-2">
					<div className="row mt-4 ml-2 mr-2">
						<div className="col-md-8">
							<h4>Cart ({cart.length} items)</h4>
							{!cart.length ? (
								<h4>
									Your cart is empty.{' '}
									<Link href="/shop">
										<a>Continue Shopping</a>
									</Link>
								</h4>
							) : (
								showCartItems()
							)}
						</div>
						<div className="col-md-4">
							<h4>Order Summary</h4>
							<hr />
							<p>Products</p>
							{cart.map((product, index) => (
								<div key={index}>
									<p>
										{product.title} x {product.count} = ${product.price * product.count}
									</p>
								</div>
							))}
							<hr />
							<div>
								Total : <b>${getTotal()}</b>
							</div>
							<hr />
							{user ? (
								<React.Fragment>
									<button
										className="btn btn-sm btn-primary mt-2 btn-raised"
										onClick={saveOrderToDB}
										disabled={!cart.length}
									>
										Proceed to Checkout
									</button>
									<br />
									<button
										className="btn btn-sm btn-warning mt-2 btn-raised"
										onClick={saveCashOrderToDB}
										disabled={!cart.length}
									>
										Pay Cash on delivery
									</button>
								</React.Fragment>
							) : (
								<Link
									href={{
										pathname: 'auth/login',
										query: { from: 'cart' }
									}}
								>
									<a className="btn btn-sm btn-danger mt-2 btn-raised">Login to Checkout</a>
								</Link>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export default CartPage;
