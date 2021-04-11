import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

function Search() {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	const handleChange = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: e.target.value }
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Router.push(`/shop?${text}`);
	};

	return (
		<React.Fragment>
			<form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
				<input
					type="search"
					value={text}
					className="form-control mr-2"
					placeholder="Search Products..."
					onChange={handleChange}
				/>

				<SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
			</form>
		</React.Fragment>
	);
}

export default Search;
