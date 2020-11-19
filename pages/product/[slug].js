import React, { useState, useEffect } from 'react';
import { getSingleProduct, productStarRating, getRelatedProducts } from '../../actions/product';
import axios from 'axios';
import { API_URL } from '../../config';
import Layout from '../../components/Layout';
import SingleProduct from '../../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/cards/ProductCard';

function SingleProductPage({ product_from_db, params, related_products_from_db }) {
	const [ values, setValues ] = useState({
		product: product_from_db,
		star: 0,
		comment: '',
		productName: '',
		relatedProducts: related_products_from_db
	});

	const { user } = useSelector((state) => ({ ...state }));

	const { product, star, comment, productName, relatedProducts } = values;

	useEffect(
		() => {
			if (product.ratings && user) {
				let existingRatingObject = product.ratings.find(
					(rating) => rating.postedBy.toString() === user._id.toString()
				);

				if (existingRatingObject !== undefined) {
					setValues({ ...values, star: existingRatingObject.star, comment: existingRatingObject.comment });
				}
			}
		},
		[ user ]
	);

	const loadSingleProduct = () => {
		getSingleProduct(params.slug).then((res) => setValues({ ...values, product: res.data }));
	};

	const onStarClick = (newRating, name) => {
		setValues({ ...values, star: newRating, productName: name });
	};

	const handleSubmitRating = () => {
		productStarRating(productName, { star, comment }, user.token)
			.then((res) => {
				loadSingleProduct();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const showRelatedProducts = () => {
		return relatedProducts.length ? (
			relatedProducts.map((related) => {
				return (
					<div className="col-md-4" key={related._id}>
						<ProductCard product={related} />
					</div>
				);
			})
		) : (
			<div className="text-center col">No Products Found</div>
		);
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="container-fluid">
					<div className="row pt-4">
						<SingleProduct
							product={product}
							onStarClick={onStarClick}
							values={values}
							setValues={setValues}
							handleSubmitRating={handleSubmitRating}
						/>
					</div>

					<div className="row">
						<div className="col text-center pt-5 pb-5">
							<hr />
							<h4>Related Products</h4>
							<hr />
							<div className="row pb-5">{showRelatedProducts()}</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts

// 	const res = await axios.get(`${API_URL}/products`);

// 	const products = await res.data;

// 	const paths = products.map((product) => ({
// 		params: { slug: product.slug }
// 	}));

// 	return { paths, fallback: true };
// }

export async function getServerSideProps({ params }) {
	return getSingleProduct(params.slug).then((res) => {
		return getRelatedProducts(res.data._id).then((result) => {
			return {
				props: {
					product_from_db: res.data,
					related_products_from_db: result.data,
					params
				}
			};
		});
	});
}

// return {
// 	props: {
// 		product_from_db: res.data,
// 		params
// 	}
// };

export default SingleProductPage;
