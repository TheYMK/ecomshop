import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../actions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../actions/category';
import FileUpload from '../../../components/forms/FileUpload';

function ProductCreatePage() {
	const { user } = useSelector((state) => ({ ...state }));

	const [ values, setValues ] = useState({
		title: '',
		description: '',
		price: '',
		category: '',
		categories: [],
		subs: [],
		shipping: '',
		quantity: '',
		images: [],
		colors: [ 'Black', 'Brown', 'Silver', 'Blue', 'Red' ], //those are for options
		brands: [ 'Apple', 'Samsung', 'Huawei', 'Microsoft', 'Xiaomi', 'Asus' ], //those are for options
		color: '',
		brand: ''
	});

	const [ loading, setLoading ] = useState(false);
	const [ subOptions, setSubOptions ] = useState([]);
	const [ showSubs, setShowSubs ] = useState(false);

	const {
		title,
		description,
		price,
		category,
		categories,
		subs,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand
	} = values;

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const c = await getCategories();
		return setValues({ ...values, categories: c.data });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				setLoading(false);
				// toast.success('Product has been created successfully');
				window.alert(`${res.data.title} product has been created`);
				window.location.reload();
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
				setShowSubs(true);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.error);
			});
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
								<h4>Create Product</h4>
								<hr />

								<div className="p-3">
									<FileUpload
										values={values}
										setValues={setValues}
										setLoading={setLoading}
										loading={loading}
									/>
								</div>

								<ProductCreateForm
									values={values}
									handleSubmit={handleSubmit}
									handleChange={handleChange}
									handleCategoryChange={handleCategoryChange}
									subOptions={subOptions}
									setValues={setValues}
									showSubs={showSubs}
								/>
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default ProductCreatePage;
