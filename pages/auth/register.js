import React from 'react';
import Layout from '../../components/Layout';
import RegisterComponent from '../../components/auth/RegisterComponent';

function RegisterPage() {
	return (
		<React.Fragment>
			<Layout>
				<RegisterComponent />
			</Layout>
		</React.Fragment>
	);
}

export default RegisterPage;
