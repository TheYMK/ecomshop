import React, { useState } from 'react';
import { Card, Tabs, Comment, Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined, StopOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../styles/SingleProduct.module.css';
import ProductListItems from '../cards/ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../actions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToWishlist } from '../../actions/user';
import Router from 'next/router';

const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, values, setValues, handleSubmitRating }) {
	const { star, comment } = values;
	const [ tooltip, setTooltip ] = useState('Add to Cart');

	// redux
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	const showComments = () => {
		const allRatings = [];

		const ratingArrays = product && product.ratings;

		// ratingArrays.map((rating) => {
		// 	return allComments.push(rating.comment);
		// });

		for (let i = 0; i < ratingArrays.length; i++) {
			allRatings.push(ratingArrays[i]);
		}

		return allRatings.map((rating, index) => {
			return (
				<div key={index}>
					<Comment
						author={rating.postedBy}
						avatar={<Avatar icon={<UserOutlined />} />}
						content={<p>{rating.comment}</p>}
					/>
				</div>
			);
		});
	};

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

	const handleAddToWishlist = (e) => {
		addToWishlist(product._id, user.token).then((res) => {
			toast.success('Product added to wishlist');
			Router.push('/user/wishlist');
		});
	};

	return (
		<React.Fragment>
			<div className="col-md-7">
				{product.images && product.images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{product.images &&
							product.images.map((image) => (
								<div key={image.public_id}>
									<img src={image.url} />
								</div>
							))}
					</Carousel>
				) : (
					<Card cover={<img src="/static/images/noimage.png" className="mb-3 card-image" />} />
				)}

				<Tabs type="card">
					<TabPane tab="Description" key="1">
						{product.description && product.description}
					</TabPane>
					<TabPane tab="More" key="2">
						Call us on +269 3325168 to learn more about this product
					</TabPane>
					<TabPane tab="Comments" key="3">
						{showComments()}
					</TabPane>
				</Tabs>
			</div>

			<div className="col-md-5">
				<Card
					actions={[
						<React.Fragment>
							{product.quantity < 1 ? (
								<React.Fragment>
									<StopOutlined /> Out of stock
								</React.Fragment>
							) : (
								<React.Fragment>
									<ShoppingCartOutlined onClick={handleAddToCart} className="text-success" /> Add to
									Cart
								</React.Fragment>
							)}
						</React.Fragment>,
						<React.Fragment>
							<HeartOutlined className="text-danger" onClick={handleAddToWishlist} />
							Add to Wishlist
						</React.Fragment>,
						<React.Fragment>
							<RatingModal handleSubmitRating={handleSubmitRating} slug={product.slug}>
								<div>
									<StarRating
										name={product._id}
										numberOfStars={5}
										rating={star}
										changeRating={onStarClick}
										isSelectable={true}
										starRatedColor="red"
										starDimension="40px"
									/>
									<form className="mt-3">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												value={comment}
												placeholder="Comment..."
												onChange={(e) => setValues({ ...values, comment: e.target.value })}
											/>
										</div>
									</form>
								</div>
							</RatingModal>
						</React.Fragment>
					]}
				>
					<Meta title={product.title} description={product.description} />
					<hr />
					{product && product.ratings && product.ratings.length > 0 ? (
						showAverage(product)
					) : (
						<div className="text-center pt-1 pb-3">No rating yet</div>
					)}
					<ProductListItems product={product} />
				</Card>
			</div>
		</React.Fragment>
	);
}

export default SingleProduct;
