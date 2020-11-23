import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPayementInfo from '../cards/ShowPaymentInfo';
import Link from 'next/link';

function Orders({ orders, handleStatusChange }) {
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
			{orders.map((order, index) => (
				<div key={order._id} className="pb-5 m-5">
					<div className="card">
						<div
							style={
								order.order_status === 'Not Processed' ? (
									styles.orderCardBackgroundRed
								) : (
									styles.orderCardBackgroundGreen
								)
							}
						/>
						<div className="p-4">
							<ShowPayementInfo order={order} />

							<div>Change delivery Status</div>
							<div>
								<select
									onChange={(e) => handleStatusChange(order._id, e.target.value)}
									className="form-control"
									defaultValue={order.order_status}
									name="status"
								>
									<option value="Not Processed">Not Processed</option>
									<option value="Processing">Processing</option>
									<option value="Dispatched">Dispatched</option>
									<option value="Cancelled">Cancelled</option>
									<option value="Completed">Completed</option>
								</select>
							</div>
							<div className="mt-2">{showOrderInTable(order)}</div>
						</div>
					</div>
				</div>
			))}
		</React.Fragment>
	);
}

const styles = {
	orderCardBackgroundRed: {
		height: '5px',
		weight: '100%',
		backgroundColor: 'red'
	},
	orderCardBackgroundOrange: {
		height: '5px',
		weight: '100%',
		backgroundColor: 'orange'
	},
	orderCardBackgroundGreen: {
		height: '5px',
		weight: '100%',
		backgroundColor: 'green'
	}
};

export default Orders;
