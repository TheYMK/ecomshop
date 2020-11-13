import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../../actions/product';
import axios from 'axios';
import { API_URL } from '../../config';
import Layout from '../../components/Layout';
import SingleProduct from '../../components/cards/SingleProduct';

function SingleProductPage({ product }) {
	return (
		<React.Fragment>
			<Layout>
				<div className="container-fluid">
					<div className="row pt-4">
						<SingleProduct product={product} />
					</div>

					<div className="row">
						<div className="col text-center pt-5 pb-5">
							<hr />
							<h4>Related Products</h4>
							<hr />
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export async function getStaticPaths() {
	// Call an external API endpoint to get posts

	const res = await axios.get(`${API_URL}/products`);

	const products = await res.data;

	const paths = products.map((product) => ({
		params: { slug: product.slug }
	}));

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	return getSingleProduct(params.slug).then((res) => {
		return {
			props: {
				product: res.data,
				params
			}
		};
	});
}

export default SingleProductPage;
