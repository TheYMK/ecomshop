import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import { auth } from '../../actions/firebase';
import { getCurrentUser } from '../../actions/auth';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Link from 'next/link';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

function UserHistoryPage() {
	const [ values, setValues ] = useState({
		orders: []
	});

	const { orders } = values;

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(
		() => {
			if (user && user.token) {
				loadUserOrders();
			}
		},
		[ user ]
	);

	const loadUserOrders = () =>
		getUserOrders(user.token).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setValues({ ...values, orders: res.data });
		});

	const showOrders = () => {
		return orders.map((order, index) => (
			<div key={index} className="m-5 p-3 card">
				<ShowPaymentInfo order={order} />
				{showOrderInTable(order)}
				<div className="row">
					<div className="col">{showDownloadPDFLink(order)}</div>
				</div>
			</div>
		));
	};

	const showDownloadPDFLink = (order) => (
		<PDFDownloadLink
			document={<Invoice order={order} />}
			fileName="invoice.pdf"
			className="btn btn-sm btn-danger btn-raised"
		>
			Download Invoice (PDF)
		</PDFDownloadLink>
	);

	const showOrderInTable = (order) => (
		<div className="table-responsive">
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Price</th>
						<th scope="col">Brand</th>
						<th scope="col">Color</th>
						<th scope="col">Count</th>
						<th scope="col">Shipping</th>
					</tr>
				</thead>
				<tbody>
					{order.products.map((p, index) => (
						<tr key={index}>
							<td>
								<b>
									<Link href={`/product/${p.product.slug}`}>
										<a>{p.product.title}</a>
									</Link>
								</b>
							</td>
							<td>{p.product.price}</td>
							<td>{p.product.brand}</td>
							<td>{p.color}</td>
							<td>{p.count}</td>
							<td>
								{p.product.shipping === 'Yes' ? (
									<CheckCircleOutlined style={{ color: 'green' }} />
								) : (
									<CloseCircleOutlined style={{ color: 'red' }} />
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<React.Fragment>
			<Layout>
				<Private>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<UserNav />
							</div>
							<div className="col text-center">
								<h4>{orders.length > 0 ? 'Purchased products' : 'No purchased products yet'}</h4>
								{showOrders()}
							</div>
						</div>
					</div>
				</Private>
			</Layout>
		</React.Fragment>
	);
}

export default UserHistoryPage;
