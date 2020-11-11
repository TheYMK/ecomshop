import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { getProductByCount } from '../actions/product';
import ProductCard from '../components/cards/ProductCard';
import Hero from '../components/Hero';
import LoadingCard from '../components/cards/LoadingCard';

const Home = ({ products_from_db }) => {
	const [ values, setValues ] = useState({
		products: products_from_db,
		loading: false
	});

	const { products, loading } = values;

	const loadAllProducts = () => {
		setValues({ ...values, loading: true });
		getProductByCount(3).then((res) => {
			setValues({ ...values, products: res.data, loading: false });
		});
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="hero">
					<Hero loading={loading} text={[ '50% OFF', 'During november', "Don't miss it!" ]} />
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
};

export async function getStaticProps(context) {
	return getProductByCount(3)
		.then((res) => {
			return {
				props: {
					products_from_db: res.data
				},
				revalidate: 1
			};
		})
		.catch((err) => {
			console.log(err);
			return {
				props: {
					products: []
				}
			};
		});
}

export default Home;
