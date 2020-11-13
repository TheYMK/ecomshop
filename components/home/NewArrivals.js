import React, { useState, useEffect } from 'react';
import { getProducts, getProductsTotalCount } from '../../actions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const NewArrivals = () => {
	const [ values, setValues ] = useState({
		products: [],
		loading: false,
		page: 1,
		productsCount: 0
	});

	const { products, loading, page, productsCount } = values;

	useEffect(
		() => {
			loadAllProductsAndProductsCount();
		},
		[ page ]
	);

	const loadAllProductsAndProductsCount = () => {
		setValues({ ...values, loading: true });
		getProducts('createdAt', 'desc', page).then((res) => {
			getProductsTotalCount().then((result) => {
				setValues({ ...values, products: res.data, loading: false, productsCount: result.data });
			});
		});
	};

	return (
		<React.Fragment>
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
				<Pagination
					className="text-center"
					current={page}
					total={productsCount / 3 * 10}
					onChange={(value) => setValues({ ...values, page: value })}
				/>
			</div>
		</React.Fragment>
	);
};

export default NewArrivals;
