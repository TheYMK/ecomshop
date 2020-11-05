import React from 'react';
import { Button } from 'antd';

const CategoryForm = ({ handleSubmit, setValues, values }) => {
	const { name, loading } = values;

	return (
		<form>
			<div className="form-group">
				<label>Name</label>
				<input
					type="text"
					className="form-control"
					value={name}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
					autoFocus
					required
				/>
			</div>
			<Button
				onClick={handleSubmit}
				type="primary"
				className="mb-2"
				shape="round"
				size="medium"
				loading={loading}
				disabled={!name}
			>
				Create
			</Button>
		</form>
	);
};

export default CategoryForm;
