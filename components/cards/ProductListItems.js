import React from 'react';
import Link from 'next/link';
import CurrencyFormat from 'react-currency-format';

function ProductListItems({ product }) {
	return (
		<React.Fragment>
			<ul className="list-group">
				<li className="list-group-item">
					Price{' '}
					<span className="label label-default label-pill pull-xs-right">
						<CurrencyFormat
							value={product.price}
							displayType={'text'}
							thousandSeparator={true}
							prefix={'$'}
						/>
					</span>
				</li>
				<li className="list-group-item">
					Category{' '}
					<Link href={`/category/${product.category.slug}`}>
						<a className="label label-default label-pill pull-xs-right">{product.category.name}</a>
					</Link>
				</li>

				{product.subs && (
					<li className="list-group-item">
						Sub Categories{' '}
						{product.subs.map((sub) => (
							<Link href={`/sub/${sub.slug}`} key={sub._id}>
								<a className="label label-default label-pill pull-xs-right">{sub.name}</a>
							</Link>
						))}
					</li>
				)}

				<li className="list-group-item">
					Shipping <span className="label label-default label-pill pull-xs-right">{product.shipping}</span>
				</li>
				<li className="list-group-item">
					Color <span className="label label-default label-pill pull-xs-right">{product.color}</span>
				</li>
				<li className="list-group-item">
					Brand <span className="label label-default label-pill pull-xs-right">{product.brand}</span>
				</li>
				<li className="list-group-item">
					Available <span className="label label-default label-pill pull-xs-right">{product.quantity}</span>
				</li>
				<li className="list-group-item">
					Sold <span className="label label-default label-pill pull-xs-right">{product.sold}</span>
				</li>
			</ul>
		</React.Fragment>
	);
}

export default ProductListItems;
