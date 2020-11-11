import Layout from '../../components/Layout';
import React, { useState } from 'react';
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
							<div className="col-md-10">
								<h4>Admin Dashboard</h4>
							</div>
						</div>
					</div>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default AdminDashboardPage;
