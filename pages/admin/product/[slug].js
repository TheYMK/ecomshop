import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getSingleProduct, getAllProducts, updateProduct } from '../../../actions/product';
import { getCategories, getCategorySubs } from '../../../actions/category';
import FileUpload from '../../../components/forms/FileUpload';
import axios from 'axios';
import { API_URL } from '../../../config';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import Router from 'next/router';

function ProductUpdatePage({ product, subCategoriesOptions, subCategoriesIds, params }) {
	const { user } = useSelector((state) => ({ ...state }));

	const [ values, setValues ] = useState({
		title: product.title,
		description: product.description,
		price: product.price,
		category: product.category,
		categories: [],
		subs: product.subs,
		shipping: product.shipping,
		quantity: product.quantity,
		images: product.images,
		colors: [ 'Black', 'Brown', 'Silver', 'Blue', 'Red', 'Gold' ], //those are for options
		brands: [ 'Apple', 'Samsung', 'Huawei', 'Microsoft', 'Xiaomi', 'Asus' ], //those are for options
		color: product.color,
		brand: product.brand
	});
	const [ loading, setLoading ] = useState(false);
	const [ subOptions, setSubOptions ] = useState(subCategoriesOptions);
	const [ arrayOfSubIds, setArrayOfSubIds ] = useState(subCategoriesIds);

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const c = await getCategories();
		return setValues({ ...values, categories: c.data });
	};

	const loadProduct = () => {
		getSingleProduct(params.slug).then((p) => {
			setValues({ ...values, ...p.data });
			getCategorySubs(p.data.category._id).then((res) => {
				setSubOptions(res.data);
			});

			let arr = [];
			p.data.subs.map((s) => {
				arr.push(s._id);
			});

			setArrayOfSubIds((prev) => arr);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		values.subs = arrayOfSubIds;
		console.log('VALUES', values);
		updateProduct(params.slug, values, user.token)
			.then((res) => {
				setLoading(false);

				toast.success(`"${res.data.title}" is updated`);
				Router.push('/admin/products');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				// if (err.response.status === 400) toast.error(err.response.data);
				toast.error(err.response.data.error);
			});
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = (e) => {
		setValues({ ...values, category: e.target.value, subs: [] });
		getCategorySubs(e.target.value)
			.then((res) => {
				setSubOptions(res.data);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.error);
			});

		if (product.category._id === e.target.value) {
			loadProduct();
		} else {
			setArrayOfSubIds([]);
		}
	};

	return (
		<React.Fragment>
			<Layout>
				<Admin>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<AdminNav />
							</div>
							<div className="col-md-10">
								<h4>Update Product</h4>
								{/* {JSON.stringify(values)} */}
								<hr />

								<div className="p-3">
									<FileUpload
										values={values}
										setValues={setValues}
										setLoading={setLoading}
										loading={loading}
									/>
								</div>

								<ProductUpdateForm
									values={values}
									setValues={setValues}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
									handleCategoryChange={handleCategoryChange}
									subOptions={subOptions}
									arrayOfSubIds={arrayOfSubIds}
									setArrayOfSubIds={setArrayOfSubIds}
								/>
							</div>
						</div>
					</div>
				</Admin>
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
		return getCategorySubs(res.data.category._id).then((response) => {
			let arr = [];
			res.data.subs.map((sub) => {
				arr.push(sub._id);
			});
			return {
				props: {
					product: res.data,
					subCategoriesOptions: response.data,
					subCategoriesIds: arr,
					params
				}
			};
		});
	});
}

export default ProductUpdatePage;
