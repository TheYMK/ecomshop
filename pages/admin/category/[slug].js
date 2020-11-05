import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../../components/auth/Admin';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { Button, Table, Tag, Space } from 'antd';
import { useSelector } from 'react-redux';
import { getSingleCategory, updateCategory } from '../../../actions/category';
import Router from 'next/router';
import CategoryForm from '../../../components/forms/CategoryForm';

function CategoryUpdatePage({ params }) {
	const [ values, setValues ] = useState({
		name: '',
		loading: false
	});

	const { user } = useSelector((state) => ({ ...state }));

	const { name, loading } = values;

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = () => {
		return getSingleCategory(params.slug).then((c) => setValues({ ...values, name: c.data.name }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });

		updateCategory({ name }, user.token, params.slug)
			.then((res) => {
				setValues({ ...values, loading: false, name: '' });
				Router.push('/admin/category');
				toast.success(`"${res.data.name}" category has been updated`);
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
								<h4>Update Category</h4>
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

export default CategoryUpdatePage;
