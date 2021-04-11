import React from 'react';
import Layout from '../../../components/Layout';
import LoginComponent from '../../../components/auth/LoginComponent';

function LoginPage() {
	return (
		<React.Fragment>
			<Layout>
				<LoginComponent />
			</Layout>
		</React.Fragment>
	);
}

export default LoginPage;
