import Layout from '../../components/Layout';
import React from 'react';
import Admin from '../../components/auth/Admin';
import AdminNav from '../../components/nav/AdminNav';

function AdminDashboardPage() {
	return (
		<React.Fragment>
			<Layout>
				<Admin>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<AdminNav />
							</div>
							<div className="col">Admin dashboard page</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default AdminDashboardPage;
