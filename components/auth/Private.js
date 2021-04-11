import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import LoadingToRedirect from '../LoadingToRedirect';

function Private({ children }) {
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<React.Fragment>
			<LoadingToRedirect />
		</React.Fragment>
	);
}

export default Private;
