import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import ModalImage from 'react-modal-image';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ProductCheckoutCard({ product }) {
	const colors = [ 'Black', 'Brown', 'Silver', 'Blue', 'Red', 'Gold' ];
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	const handleColorChange = (e) => {
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			cart.map((p, index) => {
				if (p._id === product._id) {
					// we update the color of the product here
					cart[index].color = e.target.value;
				}
			});

			// console.log('Cart Color Update', cart);

			// save changes to localstorage
			localStorage.setItem('cart', JSON.stringify(cart));

			// save changes to redux
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleCountChange = (e) => {
		let count = e.target.value;
		if (count > product.quantity) {
			toast.error(`Sorry! Only ${product.quantity} pieces available for this product`);
			return;
		}
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			cart.map((p, index) => {
				if (p._id === product._id) {
					// we update the count of the product here
					cart[index].count = e.target.value;
				}
			});

			// save changes to localstorage
			localStorage.setItem('cart', JSON.stringify(cart));

			// save changes to redux
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleRemove = () => {
		console.log(`${product._id} to remove`);

		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			cart.map((p, index) => {
				if (p._id === product._id) {
					// we update the count of the product here
					cart.splice(index, 1);
				}
			});

			// save changes to localstorage
			localStorage.setItem('cart', JSON.stringify(cart));

			// save changes to redux
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	return (
		<tbody>
			<tr>
				<td>
					<div style={{ width: '100px', height: 'auto' }}>
						{product.images.length ? (
							<ModalImage small={product.images[0].url} large={product.images[0].url} />
						) : (
							<img src="/static/images/noimage.png" style={{ width: '100px', height: 'auto' }} />
						)}
					</div>
				</td>
				<td>{product.title}</td>
				<td>${product.price}</td>
				<td>{product.brand}</td>
				<td>
					<select name="color" value={product.color} onChange={handleColorChange} className="form-control">
						{/* {product.color ? (
							<option value={product.color}>{product.color}</option>
						) : (
							<option>Select</option>
						)} */}
						{colors.map((color, index) => (
							<option key={index} value={color}>
								{color}
							</option>
						))}
					</select>
				</td>
				<td className="text-center">
					<input
						type="number"
						className="form-control"
						value={product.count}
						onChange={handleCountChange}
						min={1}
					/>
				</td>
				<td className="text-center">
					{product.shipping === 'Yes' ? (
						<CheckCircleOutlined className="text-success " />
					) : (
						<CloseCircleOutlined className="text-danger" />
					)}
				</td>
				<td className="text-center">
					<CloseOutlined onClick={handleRemove} className="text-danger" />
				</td>
			</tr>
		</tbody>
	);
}

export default ProductCheckoutCard;
