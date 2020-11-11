import React, { useState } from 'react';
import { Button, Select } from 'antd';
const { Option } = Select;

function ProductUpdateForm({
	values,
	handleSubmit,
	handleChange,
	setValues,
	handleCategoryChange,
	subOptions,
	arrayOfSubIds,
	setArrayOfSubIds
}) {
	const [ loading, setLoading ] = useState(false);

	const {
		title,
		description,
		price,
		category,
		categories,
		subs,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand
	} = values;

	const showUpdateProductForm = () => (
		<form>
			<div className="from-group">
				<label>Title</label>
				<input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
			</div>
			<div className="from-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					className="form-control"
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className="from-group">
				<label>Price</label>
				<input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
			</div>
			<div className="from-group">
				<label>Shipping</label>
				<select
					value={shipping === 'Yes' ? 'Yes' : 'No'}
					name="shipping"
					className="form-control"
					onChange={handleChange}
				>
					<option value="Yes">Yes</option>
					<option className="No">No</option>
				</select>
			</div>
			<div className="from-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					value={quantity}
					onChange={handleChange}
				/>
			</div>
			<div className="from-group">
				<label>Color</label>
				<select value={color} name="color" className="form-control" onChange={handleChange}>
					{colors.map((color, index) => (
						<option key={index} value={color}>
							{color}
						</option>
					))}
				</select>
			</div>
			<div className="from-group">
				<label>Brand</label>
				<select value={brand} name="brand" className="form-control" onChange={handleChange}>
					{brands.map((brand, index) => (
						<option key={index} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Category</label>
				<select value={category._id} name="category" className="form-control" onChange={handleCategoryChange}>
					{categories.length > 0 &&
						categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
				</select>
			</div>

			<div>
				<label>Sub Categories</label>
				<Select
					mode="multiple"
					allowClear
					style={{ width: '100%' }}
					placeholder="Please select"
					value={arrayOfSubIds}
					onChange={(value) => setArrayOfSubIds(value)}
				>
					{subOptions.length &&
						subOptions.map((sub) => (
							<Option value={sub._id} key={sub._id}>
								{sub.name}
							</Option>
						))}
				</Select>
			</div>

			<div className="mt-4">
				<Button
					onClick={handleSubmit}
					type="primary"
					className="mb-2"
					shape="round"
					size="large"
					loading={loading}
					disabled={!title}
				>
					Save
				</Button>
			</div>
		</form>
	);

	return <React.Fragment>{showUpdateProductForm()}</React.Fragment>;
}

export default ProductUpdateForm;
