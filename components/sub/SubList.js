import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingOutlined } from '@ant-design/icons';
import { getSubs } from '../../actions/sub';

function SubList() {
	const [ values, setValues ] = useState({
		subs: [],
		loading: false
	});

	const { subs, loading } = values;

	useEffect(() => {
		setValues({ ...values, loading: true });
		getSubs().then((res) => {
			setValues({ ...values, subs: res.data, loading: false });
		});
	}, []);

	const showSubs = () => {
		return subs.map((sub) => (
			<div className="col" key={sub._id}>
				<Link href={`/sub/${sub.slug}`}>
					<a className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3" style={{ color: '#000' }}>
						{sub.name}
					</a>
				</Link>
			</div>
		));
	};

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">{loading ? <LoadingOutlined className="text-center" /> : showSubs()}</div>
			</div>
		</React.Fragment>
	);
}

export default SubList;
