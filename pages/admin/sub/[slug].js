import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../actions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { createSub, getSingleSub, removeSub, updateSub } from '../../../actions/sub';
import Router from 'next/router';

function SubUpdatePage({ params }) {
	const [ values, setValues ] = useState({
		name: '',
		loading: false,
		categories: [],
		parentCategory: ''
	});

	const { user } = useSelector((state) => ({ ...state }));

	const { name, loading, categories, parentCategory } = values;

	useEffect(() => {
		loadCategoriesAndSub();
		// loadSubs();
	}, []);

	const loadCategoriesAndSub = async () => {
		const c = await getCategories();
		const s = await getSingleSub(params.slug);

		return setValues({ ...values, categories: c.data, name: s.data.name, parentCategory: s.data.parent });
	};

	// const loadSubs = async () => {
	// 	const s = await getSubs();
	// 	return setValues({ ...values, subs: s.data });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		updateSub({ name, parent: parentCategory }, user.token, params.slug)
			.then((res) => {
				setValues({ ...values, loading: false, name: '' });
				toast.success(`"${res.data.name}" sub category has been updated`);
				Router.push('/admin/sub');
			})
			.catch((err) => {
				console.log(err);
				setValues({ ...values, loading: false });
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
							<div className="col">
								<h4>Update Sub Category</h4>
								<div className="form-group">
									<label>Parent Category</label>
									<select
										name="category"
										className="form-control"
										onChange={(e) => setValues({ ...values, parentCategory: e.target.value })}
									>
										<option value="">Please select a category</option>
										{categories.length > 0 &&
											categories.map((category) => (
												<option
													key={category._id}
													value={category._id}
													selected={category._id === parentCategory}
												>
													{category.name}
												</option>
											))}
									</select>
								</div>

								<CategoryForm handleSubmit={handleSubmit} setValues={setValues} values={values} />
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export async function getServerSideProps({ params }) {
	return {
		props: {
			params
		}
	};
}

export default SubUpdatePage;
