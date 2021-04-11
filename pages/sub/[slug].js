import React, { useState } from 'react';
import { getSingleSub } from '../../actions/sub';
import { LoadingOutlined } from '@ant-design/icons';
import ProductCard from '../../components/cards/ProductCard';
import Layout from '../../components/Layout';
import LoadingCard from '../../components/cards/LoadingCard';
import '../../styles/SingleSub.module.css';

function SingleSubPage({ sub_from_db, products_from_db, params }) {
	const [ values, setValues ] = useState({
		sub: sub_from_db,
		products: products_from_db,
		loading: false
	});

	const { sub, products, loading } = values;

	return (
		<React.Fragment>
			<Layout>
				<div className="jumbotron hero-sub">
					<div class="text-center mt-5">
						<h3 className="sub-title">{sub.name.toUpperCase()} SubCategory</h3>
						<div>
							{loading ? (
								<div className="text-center p-3 mt-5 mb-5">
									<LoadingOutlined />
								</div>
							) : (
								<div className="text-center p-3 mt-2 mb-5 sub-subtitle">
									{products.length} products available
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="container">
					{loading ? (
						<LoadingCard count={3} />
					) : (
						<div className="row">
							{products.map((product) => {
								return (
									<div className="col-md-4" key={product._id}>
										<ProductCard product={product} />
									</div>
								);
							})}
						</div>
					)}
				</div>
			</Layout>
		</React.Fragment>
	);
}

export async function getServerSideProps({ params }) {
	return getSingleSub(params.slug).then((res) => {
		return {
			props: {
				sub_from_db: res.data.sub,
				products_from_db: res.data.products,
				params
			}
		};
	});
}

export default SingleSubPage;
