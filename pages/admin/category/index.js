import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../actions/category';
import Link from 'next/link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

function CategoryCreatePage() {
	const [ values, setValues ] = useState({
		name: '',
		loading: false,
		categories: [],
		keyword: ''
	});

	const { user } = useSelector((state) => ({ ...state }));

	const { name, loading, categories, keyword } = values;

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => {
		return getCategories().then((c) => setValues({ ...values, categories: c.data }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		createCategory({ name }, user.token)
			.then((res) => {
				setValues({ ...values, loading: false, name: '' });
				toast.success(`"${res.data.name}" category has been created`);
				loadCategories();
			})
			.catch((err) => {
				console.log(err);
				setValues({ ...values, loading: false });
				toast.error(err.response.data.error);
			});
	};

	const handleRemove = async (slug) => {
		let answer = window.confirm('Are you sure to remove this category?');
		setValues({ ...values, loading: true });
		if (answer) {
			removeCategory(slug, user.token)
				.then((res) => {
					setValues({ ...values, loading: false });
					toast.success(`${res.data.name} category deleted successfully`);
					loadCategories();
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

	const showCategories = () => {
		return categories.filter(searched(keyword)).map((category) => (
			<div className="alert alert-secondary" key={category._id}>
				{category.name}
				<span className="btn btn-sm float-right" onClick={(e) => handleRemove(category.slug)}>
					<DeleteOutlined className="text-danger" />
				</span>
				<Link href={`/admin/category/${category.slug}`}>
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
								<h4>Create Category</h4>
								<CategoryForm handleSubmit={handleSubmit} setValues={setValues} values={values} />
								<LocalSearch setValues={setValues} values={values} />
								{showCategories()}
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default CategoryCreatePage;
