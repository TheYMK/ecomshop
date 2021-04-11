import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

function Invoice({ order }) {
	return (
		<Document>
			<Page style={styles.body}>
				<Text style={styles.header} fixed>
					~ {new Date().toLocaleString('en-US')} ~
				</Text>
				<Text style={styles.title}>Order Invoice</Text>
				<Text style={styles.author}>E-COM SHOP</Text>
				<Text style={styles.subtitle}>Order Summary</Text>

				<Table>
					<TableHeader>
						<TableCell>Title</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Brand</TableCell>
						<TableCell>Color</TableCell>
						<TableCell>Count</TableCell>
						<TableCell>Shipping</TableCell>
					</TableHeader>
				</Table>

				<Table data={order.products}>
					<TableBody>
						<DataTableCell getContent={(x) => x.product.title} />
						<DataTableCell
							getContent={(x) =>
								x.product.price.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD'
								})}
						/>
						<DataTableCell getContent={(x) => x.product.brand} />
						<DataTableCell getContent={(x) => x.color} />
						<DataTableCell getContent={(x) => x.count} />
						<DataTableCell getContent={(x) => x.product.shipping} />
					</TableBody>
				</Table>
				<Text style={styles.text}>
					<Text>
						<Text style={styles.details_title}>Date: {'\n'}</Text>
						{new Date(order.payment_intent.created * 1000).toLocaleString('en-US')}
					</Text>
					{'\n'}
					{'\n'}
					<Text>
						<Text style={styles.details_title}>Order ID: {'\n'}</Text>
						{order.payment_intent.id}
					</Text>
					{'\n'}
					{'\n'}
					<Text>
						<Text style={styles.details_title}>Order Status:{'\n'}</Text>
						{order.order_status}
					</Text>
					{'\n'}
					{'\n'}
					<Text>
						<Text style={styles.details_title}>Total Paid:{'\n'}</Text>
						{(order.payment_intent.amount / 100).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD'
						})}
					</Text>
				</Text>

				<Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
			</Page>
		</Document>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35
	},
	title: {
		fontSize: 24,
		textAlign: 'center'
	},
	author: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 40
	},
	subtitle: {
		fontSize: 18,
		margin: 12
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: 'justify'
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey'
	},
	footer: {
		padding: '100px',
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey'
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey'
	},
	details_title: {
		color: 'red'
	}
});

export default Invoice;
