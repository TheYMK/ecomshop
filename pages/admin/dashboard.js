import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import Admin from '../../components/auth/Admin';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, changeOrderStatus } from '../../actions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';

function AdminDashboardPage() {
	const [ values, setValues ] = useState({
		orders: []
	});

	const { orders } = values;

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(
		() => {
			loadOrders();
		},
		[ user ]
	);

	const loadOrders = async () => {
		if (user && user.token) {
			const res = await getOrders(user.token);
			console.log(JSON.stringify(res.data, null, 4));
			setValues({ ...values, orders: res.data });
		}
	};

	const handleStatusChange = (orderId, orderStatus) => {
		changeOrderStatus(orderId, orderStatus, user.token).then((res) => {
			toast.success('Order status updated');
			loadOrders();
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
							<div className="col-md-10 text-center">
								<h4>Admin Dashboard</h4>
								<Orders orders={orders} handleStatusChange={handleStatusChange} />
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default AdminDashboardPage;
