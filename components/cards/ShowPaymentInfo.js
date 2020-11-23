import React from 'react';

function ShowPaymentInfo({ order }) {
	return (
		<React.Fragment>
			<div>
				<p>
					<span>
						<b>Order ID:</b> {order.payment_intent.id}
					</span>
					<br />
					<span>
						<b>Amount:</b>{' '}
						{(order.payment_intent.amount / 100).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</span>
					<br />
					<span>
						<b>Currency:</b> {order.payment_intent.currency.toUpperCase()}
					</span>
					<br />
					<span>
						<b>Method:</b> {order.payment_intent.payment_method_types[0]}
					</span>
					<br />
					<span>
						<b>Payment:</b> {order.payment_intent.status.toUpperCase()}
					</span>
					<br />
					<span>
						<b>Ordered on:</b> {new Date(order.payment_intent.created * 1000).toLocaleString('en-US')}
					</span>
					<br />
					<span className="badge bg-primary text-white">
						<b>Status:</b> {order.order_status}
					</span>
				</p>
			</div>
		</React.Fragment>
	);
}

export default ShowPaymentInfo;
