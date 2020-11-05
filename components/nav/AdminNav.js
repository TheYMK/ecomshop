import React from 'react';
import Link from 'next/link';

function AdminNav() {
	return (
		<React.Fragment>
			<nav>
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link href="/admin/dashboard">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Dashboard
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/product">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Product
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/products">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								All Products
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/category">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Category
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/sub">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Sub Category
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/admin/coupon">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Coupon
							</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/user/password">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Password
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}

export default AdminNav;
