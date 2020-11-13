import React, { useState, useEffect } from 'react';
import { getSingleCategory } from '../../actions/category';
import { LoadingOutlined } from '@ant-design/icons';
import ProductCard from '../../components/cards/ProductCard';
import Layout from '../../components/Layout';
import LoadingCard from '../../components/cards/LoadingCard';
import '../../styles/SingleCategory.module.css';

function SingleCategoryPage({ category_from_db, products_from_db, params }) {
	const [ values, setValues ] = useState({
		category: category_from_db,
		products: products_from_db,
		loading: false
	});

	const { category, products, loading } = values;

	return (
		<React.Fragment>
			<Layout>
				<div className="jumbotron hero-category">
					<div class="text-center mt-5">
						<h3 className="category-title">{category.name.toUpperCase()} CATEGORY</h3>
						<div>
							{loading ? (
								<div className="text-center p-3 mt-5 mb-5">
									<LoadingOutlined />
								</div>
							) : (
								<div className="text-center p-3 mt-2 mb-5 category-subtitle">
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
	return getSingleCategory(params.slug).then((res) => {
		return {
			props: {
				category_from_db: res.data.category,
				products_from_db: res.data.products,
				params
			}
		};
	});
}

export default SingleCategoryPage;
