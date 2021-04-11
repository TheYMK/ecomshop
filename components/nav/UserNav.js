import React from 'react';
import Link from 'next/link';

function UserNav() {
	return (
		<React.Fragment>
			<nav>
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link href="/user/history">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								History
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
					<li className="nav-item">
						<Link href="/user/wishlist">
							<a className="nav-link" style={{ cursor: 'pointer' }}>
								Wishlist
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}

export default UserNav;
