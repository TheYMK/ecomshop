import React from 'react';
import { Card, Tabs } from 'antd';
import Link from 'next/link';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../styles/SingleProduct.module.css';
import ProductListItems from '../cards/ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../actions/rating';

const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, values, setValues, handleSubmitRating }) {
	const { star, comment } = values;

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
				</Tabs>
			</div>

			<div className="col-md-5">
				<Card
					actions={[
						<React.Fragment>
							<ShoppingCartOutlined className="text-success" /> Add to Cart
						</React.Fragment>,
						<React.Fragment>
							<HeartOutlined className="text-danger" />
							<Link href={`/`}>
								<a>Add to Wishlist</a>
							</Link>
						</React.Fragment>,
						<React.Fragment>
							<RatingModal handleSubmitRating={handleSubmitRating}>
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
