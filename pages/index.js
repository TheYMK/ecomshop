import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<React.Fragment>
			<Layout>
				<h2>Home Page</h2>
			</Layout>
		</React.Fragment>
	);
}
