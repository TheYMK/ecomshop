import React, { useState, useEffect } from 'react';
import Router from 'next/router';

function LoadingToRedirect() {
	const [ count, setCount ] = useState(5);

	useEffect(
		() => {
			const interval = setInterval(() => {
				if (count !== 0) setCount((currentCount) => --currentCount);
			}, 1000);
			// redirect once count is equal to 0
			count === 0 && Router.push('/');
			// cleanup
			return () => clearInterval(interval);
		},
		[ count ]
	);

	return (
		<React.Fragment>
			<div className="container p-5 text-center">
				<p>Redirecting you in {count} seconds</p>
			</div>
		</React.Fragment>
	);
}

export default LoadingToRedirect;
