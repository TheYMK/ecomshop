import React from 'react';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import { auth } from '../../actions/firebase';
import { getCurrentUser } from '../../actions/auth';
import UserNav from '../../components/nav/UserNav';

function UserWishlistPage() {
	return (
		<React.Fragment>
			<Layout>
				<Private>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<UserNav />
							</div>
							<div className="col">user wishlist page</div>
						</div>
					</div>
				</Private>
			</Layout>
		</React.Fragment>
	);
}

export default UserWishlistPage;
