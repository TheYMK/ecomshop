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
import { createSub, getSubs, getSingleSub, removeSub } from '../../../actions/sub';

function SubCreatePage() {
	const [ values, setValues ] = useState({
		name: '',
		loading: false,
		categories: [],
		keyword: '',
		parentCategory: '',
		subs: []
	});

	const { user } = useSelector((state) => ({ ...state }));

	const { name, loading, categories, subs, keyword, parentCategory } = values;

	useEffect(() => {
		loadCategoriesAndSubs();
		// loadSubs();
	}, []);

	const loadCategoriesAndSubs = async () => {
		const c = await getCategories();
		const s = await getSubs();

		return setValues({ ...values, categories: c.data, subs: s.data });
	};

	// const loadSubs = async () => {
	// 	const s = await getSubs();
	// 	return setValues({ ...values, subs: s.data });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		createSub({ name, parent: parentCategory }, user.token)
			.then((res) => {
				setValues({ ...values, loading: false, name: '' });
				toast.success(`"${res.data.name}" sub category has been created`);
				loadCategoriesAndSubs();
			})
			.catch((err) => {
				console.log(err);
				setValues({ ...values, loading: false });
				toast.error(err.response.data.error);
			});
	};

	const handleRemove = async (slug) => {
		let answer = window.confirm('Are you sure to remove this sub category?');
		setValues({ ...values, loading: true });
		if (answer) {
			removeSub(slug, user.token)
				.then((res) => {
					setValues({ ...values, loading: false });
					toast.success(`${res.data.name} sub category deleted successfully`);
					loadCategoriesAndSubs();
				})
				.catch((err) => {
					console.log(err);
					setValues({ ...values, loading: false });
					if (err.response.status === 400) {
						toast.error(err.response.data.error);
					}
				});
		}
	};

	const showSubs = () => {
		return subs.filter(searched(keyword)).map((sub) => (
			<div className="alert alert-secondary" key={sub._id}>
				{sub.name}
				<span className="btn btn-sm float-right" onClick={(e) => handleRemove(sub.slug)}>
					<DeleteOutlined className="text-danger" />
				</span>
				<Link href={`/admin/sub/${sub.slug}`}>
					<a>
						<span className="btn btn-sm float-right">
							<EditOutlined className="text-success" />
						</span>
					</a>
				</Link>
			</div>
		));
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
								<h4>Create Sub Category</h4>
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
												<option key={category._id} value={category._id}>
													{category.name}
												</option>
											))}
									</select>
								</div>

								<CategoryForm handleSubmit={handleSubmit} setValues={setValues} values={values} />

								<LocalSearch setValues={setValues} values={values} />
								{showSubs()}
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default SubCreatePage;
