import React from 'react';
import { Card, Tabs } from 'antd';
import Link from 'next/link';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../styles/SingleProduct.module.css';
import ProductListItems from '../cards/ProductListItems';
const { Meta } = Card;
const { TabPane } = Tabs;
function SingleProduct({ product }) {
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
						</React.Fragment>
					]}
				>
					<Meta title={product.title} description={product.description} />
					<hr />
					<ProductListItems product={product} />
				</Card>
			</div>
		</React.Fragment>
	);
}

export default SingleProduct;
