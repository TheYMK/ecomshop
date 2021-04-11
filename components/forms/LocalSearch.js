import React, { useState } from 'react';

function LocalSearch({ values, setValues }) {
	const { keyword } = values;

	const handleSearchChange = (e) => {
		e.preventDefault();
		setValues({ ...values, keyword: e.target.value.toLowerCase() });
	};

	return (
		<input
			type="search"
			placeholder="Filter"
			value={keyword}
			onChange={handleSearchChange}
			className="form-control mb-4"
		/>
	);
}

export default LocalSearch;
