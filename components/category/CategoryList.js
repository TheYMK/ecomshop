import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../../actions/category';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '../../styles/CategoryList.module.css';

function CategoryList() {
	const [ values, setValues ] = useState({
		categories: [],
		loading: false
	});

	const { categories, loading } = values;

	useEffect(() => {
		setValues({ ...values, loading: true });
		getCategories().then((res) => {
			setValues({ ...values, categories: res.data, loading: false });
		});
	}, []);

	const showCategories = () => {
		return categories.map((category) => (
			<div className="col" key={category._id}>
				<Link href={`/category/${category.slug}`}>
					<a className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3" style={{ color: '#000' }}>
						{category.name}
					</a>
				</Link>
			</div>
		));
	};

	return (
		<React.Fragment>
			<div className="container">
				<h3 className="text-center">
					Shop with <span>US</span>
				</h3>
				<p className="text-center text-muted">Our handpicked categories</p>
				<div className="row">{loading ? <LoadingOutlined className="text-center" /> : showCategories()}</div>
			</div>
		</React.Fragment>
	);
}

export default CategoryList;
