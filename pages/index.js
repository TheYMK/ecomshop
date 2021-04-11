import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { Spin } from 'antd';
import Hero from '../components/Hero';
const NewArrivals = dynamic(() => import('../components/home/NewArrivals'), {
	loading: () => <Spin tip={`Loading...`} />
});
const BestSellers = dynamic(() => import('../components/home/BestSellers'), {
	loading: () => <Spin tip={`Loading...`} />
});
const CategoryList = dynamic(() => import('../components/category/CategoryList'), {
	loading: () => <Spin tip={`Loading...`} />
});
const SubList = dynamic(() => import('../components/sub/SubList'), {
	loading: () => <Spin tip={`Loading...`} />
});

const Home = () => {
	return (
		<React.Fragment>
			<Layout>
				<div className="hero">
					<Hero text={[ '50% OFF', 'During november', "Don't miss it!" ]} />
				</div>

				<div>
					<CategoryList />
				</div>

				<h4 className="text-center p-3 mt-5 mb-5 display-4" style={{ fontWeight: '600' }}>
					New Arrivals
				</h4>

				<NewArrivals />
				<br />
				<br />

				<h4 className="text-center p-3 mt-5 mb-5 display-4" style={{ fontWeight: '600' }}>
					Best Sellers
				</h4>

				<BestSellers />

				<div className="mt-5">
					<h4 className="text-center">Explore more</h4>
					<SubList />
				</div>
			</Layout>
		</React.Fragment>
	);
};

export default Home;
