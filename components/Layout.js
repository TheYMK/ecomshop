import Header from './nav/Header';
import React from 'react';
import 'antd/dist/antd.css';

function Layout({ children }) {
	return (
		<React.Fragment>
			<Header />
			{children}
		</React.Fragment>
	);
}

export default Layout;
