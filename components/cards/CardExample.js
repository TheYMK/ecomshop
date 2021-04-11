import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import '../../styles/ProductCard.module.css';

function CardExample() {
	return (
		<React.Fragment>
			<div className="product-card">
				<div className="product-card-head">
					<img
						className="product-card-img-top"
						src="https://res.cloudinary.com/kaymkassai/image/upload/v1604741903/xmaw4mysuddrbatxe3lk.jpg"
						alt=""
					/>
					<div className="surprise-bubble">
						<span className="product-card-heart">
							<HeartOutlined />
						</span>
						<a href="#">
							<span>More</span>
						</a>
					</div>
					<div className="product-card-body">
						<h4 className="product-card-title">Harpa</h4>
						<p className="product-card-para">Womans printed clothing</p>
						<p className="product-card-para">
							<span className="product-card-price">$9.99 &ensp;</span>
							<span className="product-card-crossed">$15.99</span>
							<span className="product-card-off">&ensp;(60% OFF)</span>
						</p>
						<div className="row">
							<div className="col-md-6 card-button">
								<a href="">
									<div className="card-button-inner bag-button">Add to cart</div>
								</a>
							</div>
							<div class="col-md-6 card-button">
								<a href="">
									<div class="card-button-inner wish-button">Whishlist</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default CardExample;
