import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CurrencyFormat from 'react-currency-format';
import { showAverage } from '../../actions/rating';
import '../../styles/ProductCard.module.css';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
	const [ tooltip, setTooltip ] = useState('Add to Cart');
	// redux
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	const handleAddToCart = (e) => {
		// Create cart array
		let cart = [];
		if (typeof window !== 'undefined') {
			// check if cart is in localstorage, we get it
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			// push new product to cart
			cart.push({
				...product,
				count: 1
			});

			// remove duplicates
			let uniqueProducts = _.uniqWith(cart, _.isEqual);
			uniqueProducts = [ ...new Set(uniqueProducts) ];
			// let uniqueProducts = [ ...new Set(cart) ];
			// save to localstorage
			// console.log('unique', unique);
			localStorage.setItem('cart', JSON.stringify(uniqueProducts));
			// show tooltip
			setTooltip('Added');

			// Add to redux state
			dispatch({
				type: 'ADD_TO_CART',
				payload: uniqueProducts
			});
			toast.success('Product added to your cart');
			dispatch({
				type: 'SET_VISIBLE',
				payload: true
			});
		}
	};

	return (
		<React.Fragment>
			<div className="product-card">
				<div className="product-card-head">
					<div>
						{product && product.ratings && product.ratings.length > 0 ? (
							showAverage(product)
						) : (
							<div className="text-center pt-1 pb-3">No rating yet</div>
						)}
					</div>
					<img
						className="product-card-img-top"
						src={
							product.images && product.images.length ? (
								product.images[0].url
							) : (
								'/static/images/noimage.png'
							)
						}
						alt=""
					/>
					<div className="surprise-bubble">
						<span className="product-card-heart">
							<EyeOutlined />
						</span>
						<Link href={`/product/${product.slug}`}>
							<a>
								<span>View More</span>
							</a>
						</Link>
					</div>
					<div className="product-card-body">
						<h4 className="product-card-title">{product.title}</h4>
						<p className="product-card-para">{`${product.description.substring(0, 20)}...`}</p>
						<p className="product-card-para">
							<span className="product-card-price">
								<CurrencyFormat
									value={product.price}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>{' '}
								&ensp;
							</span>
							<span className="product-card-crossed">$15.99</span>
							<span className="product-card-off">&ensp;(60% OFF)</span>
						</p>

						<div className="row">
							<Tooltip title={tooltip}>
								<div className="col-md-6 card-button">
									<a onClick={handleAddToCart}>
										<div className="card-button-inner bag-button">
											<ShoppingCartOutlined />
										</div>
									</a>
								</div>
							</Tooltip>
							<Tooltip title="Add to Wishlist">
								<div className="col-md-6 card-button">
									<a href="">
										<div className="card-button-inner wish-button">
											<HeartOutlined />
										</div>
									</a>
								</div>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProductCard;
