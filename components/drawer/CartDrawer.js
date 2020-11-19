import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

function CartDrawer() {
	const dispatch = useDispatch();
	const { cartDrawer, cart } = useSelector((state) => ({ ...state }));

	const imageStyle = {
		width: '100%',
		height: '100px',
		objectFit: 'contain'
	};

	return (
		<Drawer
			className="text-center"
			title={`Cart (${cart.length} items)`}
			placement="right"
			closable={true}
			visible={cartDrawer}
			onClose={() => {
				dispatch({
					type: 'SET_VISIBLE',
					payload: false
				});
			}}
		>
			<Link href="/cart">
				<a
					className="text-center btn btn-raised btn-block mb-3"
					onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
				>
					Go to cart
				</a>
			</Link>

			{cart.map((product) => (
				<div className="row" key={product._id}>
					<div className="col">
						{product.images[0] ? (
							<React.Fragment>
								<img src={product.images[0].url} style={imageStyle} />
								<p className="text-center text-light" style={{ backgroundColor: '#fc2663' }}>
									{product.title} x {product.count}{' '}
								</p>
							</React.Fragment>
						) : (
							<React.Fragment>
								<img src="/static/images/noimage.png" style={imageStyle} />
								<p className="text-center text-light" style={{ backgroundColor: '#fc2663' }}>
									{product.title} x {product.count}{' '}
								</p>
							</React.Fragment>
						)}
					</div>
				</div>
			))}
		</Drawer>
	);
}

export default CartDrawer;
