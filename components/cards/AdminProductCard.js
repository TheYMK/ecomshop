import React from 'react';
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../styles/ProductCard.module.css';
import Link from 'next/link';

function AdminProductCard({ product, handleRemove }) {
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
						alt={`${product.title} featured image`}
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
						<h4 className="product-card-title">{product.title}</h4>
						<p className="product-card-para">{`${product.description.substring(0, 20)}...`}</p>
						<p className="product-card-para">
							<span className="product-card-price">${product.price} &ensp;</span>
						</p>
						<div className="row">
							<div className="col-md-6 card-button" style={{ cursor: 'pointer' }}>
								<Link href={`/admin/product/${product.slug}`}>
									<div className="card-button-inner bag-button">
										<a style={{ color: 'white' }}>
											<EditOutlined />
										</a>
									</div>
								</Link>
							</div>
							<div className="col-md-6 card-button">
								<div
									className="card-button-inner wish-button"
									style={{ cursor: 'pointer' }}
									onClick={() => handleRemove(product.slug)}
								>
									<DeleteOutlined />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default AdminProductCard;
