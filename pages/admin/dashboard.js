import Layout from '../../components/Layout';
import React from 'react';
import Admin from '../../components/auth/Admin';

function AdminDashboardPage() {
	return (
		<React.Fragment>
			<Layout>
				<Admin>
					<p>Admin Dashboard</p>
				</Admin>
			</Layout>
		</React.Fragment>
	);
}

export default AdminDashboardPage;
