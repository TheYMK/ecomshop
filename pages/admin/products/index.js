import Layout from '../../../components/Layout';
import React, { useState } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductByCount, removeProduct } from '../../../actions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';

function AdminProductsPage({ products }) {
	const [ values, setValues ] = useState({
		products: products,
		loading: false
	});

	const { loading } = values;

	const { user } = useSelector((state) => ({ ...state }));

	const handleRemove = (slug) => {
		let answer = window.confirm('Are you sure you want to delete this product?');

		if (answer) {
			removeProduct(slug, user.token)
				.then((res) => {
					window.location.reload();
					toast.success(`${res.data.title} product is deleted`);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err);
				});
		}
	};

	return (
		<React.Fragment>
			<Layout>
				<Admin>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2 col-sm-2 col-xs-2">
								<AdminNav />
							</div>
							<div className="col-md-10">
								{loading ? <LoadingOutlined /> : <h4 className="alert">All products</h4>}

								<div className="row">
									{products.map((p) => (
										<div className="col-sm-6 col-md-5 col-lg-3 col-xl-3" key={p._id}>
											<AdminProductCard product={p} handleRemove={handleRemove} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export async function getStaticProps(context) {
	return getProductByCount(100)
		.then((res) => {
			return {
				props: {
					products: res.data
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
export default AdminProductsPage;
