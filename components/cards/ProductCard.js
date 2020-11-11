import React from 'react';
import { HeartOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import '../../styles/ProductCard.module.css';
import Link from 'next/link';

function ProductCard({ product }) {
	return (
		<React.Fragment>
			<div className="product-card">
				<div className="product-card-head">
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
							<span className="product-card-price">${product.price} &ensp;</span>
							<span className="product-card-crossed">$15.99</span>
							<span className="product-card-off">&ensp;(60% OFF)</span>
						</p>
						<div className="row">
							<div className="col-md-6 card-button">
								<a href="">
									<div className="card-button-inner bag-button">
										<ShoppingCartOutlined />
									</div>
								</a>
							</div>
							<div class="col-md-6 card-button">
								<a href="">
									<div class="card-button-inner wish-button">
										<HeartOutlined />
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProductCard;
