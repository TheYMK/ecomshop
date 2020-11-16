import React, { useState, useEffect } from 'react';
import { getProductByCount, fetchProductByFilter } from '../../actions/product';
import { getCategories } from '../../actions/category';
import { getSubs } from '../../actions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/cards/ProductCard';
import Layout from '../../components/Layout';
import Star from '../../components/forms/Star';
import {
	LoadingOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	DollarOutlined,
	DownSquareOutlined,
	StarOutlined,
	TagsOutlined,
	TrademarkOutlined,
	BgColorsOutlined,
	DingtalkOutlined
} from '@ant-design/icons';
import { Menu, Slider, Button, Checkbox, Radio } from 'antd';

const { Item, SubMenu, ItemGroup } = Menu;

function ShopPage({ products_from_db, categories_from_db, subs_from_db }) {
	const [ values, setValues ] = useState({
		products: products_from_db,
		categories: categories_from_db,
		subs: subs_from_db,
		brands: [ 'Apple', 'Samsung', 'Huawei', 'Microsoft', 'Xiaomi', 'Asus' ],
		colors: [ 'Black', 'Brown', 'Silver', 'Blue', 'Red', 'Gold' ],
		loading: false,
		menuCollpased: false
	});

	const [ price, setPrice ] = useState([ 0, 20000 ]);
	const [ ok, setOk ] = useState(false);
	const [ selectedCategories, setSelectedCategories ] = useState([]);
	const [ star, setStar ] = useState('');
	const [ selectedSub, setSelectedSub ] = useState('');
	const [ selectedBrand, setSelectedBrand ] = useState('');
	const [ selectedColor, setSelectedColor ] = useState('');
	const [ selectedShippingOption, setSelectedShippingOption ] = useState('');

	const { products, loading, menuCollpased, categories, brands, colors } = values;

	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	const toggleCollapsed = () => {
		setValues({ ...values, menuCollpased: !menuCollpased });
	};

	const fetchProducts = (arg) => {
		fetchProductByFilter(arg).then((res) => {
			setValues({ ...values, products: res.data });
		});
	};

	// ************************************************
	//		1 .load products on user search input
	// ************************************************
	useEffect(
		() => {
			if (text === '') {
				setValues({ ...values, products: products_from_db });
			} else {
				const delayed = setTimeout(() => {
					fetchProducts({ query: text });
				}, 300);

				return () => clearTimeout(delayed);
			}
		},
		[ text ]
	);

	// ************************************************
	// 		2. load products based on price range
	// ************************************************
	useEffect(
		() => {
			if (price[0] === 0 && price[1] === 0) {
				setValues({ ...values, products: products_from_db });
			} else {
				fetchProducts({ price: price });
			}
		},
		[ ok ]
	);

	// we have ok state here because we don't want to make lot of request to the backend by price change
	const handleSlider = (value) => {
		// resetvalues
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setSelectedCategories([]);
		setStar('');
		setSelectedSub('');
		setSelectedBrand('');
		setSelectedColor('');
		setSelectedShippingOption('');

		setPrice(value);

		setTimeout(() => {
			setOk(!ok);
		}, 300);
	};

	// ************************************************
	// 	3. load products based on selected category
	// ************************************************
	// show categories in checkboxes
	const showCategories = () =>
		categories_from_db.map((c) => (
			<div key={c._id}>
				<Checkbox
					className="pb-2 pl-4 pr-4 pt-3"
					value={c._id}
					name="category"
					onChange={handleCheckbox}
					checked={selectedCategories.includes(c._id)}
				>
					{c.name}
				</Checkbox>
				<br />
			</div>
		));

	const handleCheckbox = (e) => {
		// RESET PREVIOUS SEARCH OPTIONS
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setStar('');
		setPrice([ 0, 20000 ]);
		setSelectedSub('');
		setSelectedBrand('');
		setSelectedColor('');
		setSelectedShippingOption('');
		// console.log(e.target.value);

		let inTheState = [ ...selectedCategories ];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		} else {
			inTheState.splice(foundInTheState, 1);
		}

		setSelectedCategories(inTheState);
		if (inTheState.length < 1) {
			setValues({ ...values, products: products_from_db });
		} else {
			fetchProducts({ category: inTheState });
		}
	};

	// ************************************************
	// 		4. load products based on star rating
	// ************************************************
	const showStars = () => (
		<div className="pr-4 pl-4 pb-2 pt-2">
			<Star handleStarClick={handleStarClick} numberOfStars={5} />
			<br />
			<Star handleStarClick={handleStarClick} numberOfStars={4} />
			<br />
			<Star handleStarClick={handleStarClick} numberOfStars={3} />
			<br />
			<Star handleStarClick={handleStarClick} numberOfStars={2} />
			<br />
			<Star handleStarClick={handleStarClick} numberOfStars={1} />
			<br />
		</div>
	);

	const handleStarClick = (num) => {
		// RESET PREVIOUS SEARCH OPTIONS
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});

		setPrice([ 0, 20000 ]);
		setSelectedCategories([]);
		setSelectedSub('');
		setSelectedBrand('');
		setSelectedColor('');
		setSelectedShippingOption('');

		setStar(num);

		fetchProducts({ stars: num });
	};

	// ************************************************
	// 		5. load products based on sub categories
	// ************************************************

	const showSubs = () => {
		return subs_from_db.map((sub) => (
			<div
				key={sub._id}
				onClick={() => handleSub(sub)}
				className="p-1 m-1 badge badge-secondary"
				style={{ cursor: 'pointer' }}
			>
				{sub.name}
			</div>
		));
	};

	const handleSub = (sub) => {
		// RESET PREVIOUS SEARCH OPTIONS
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 20000 ]);
		setSelectedCategories([]);
		setStar('');
		setSelectedBrand('');
		setSelectedColor('');
		setSelectedShippingOption('');

		setSelectedSub(sub);
		fetchProducts({ sub: sub });
	};

	// ************************************************
	// 		6. load products based on brand
	// ************************************************

	const showBrands = () => {
		return brands.map((brand, index) => (
			<div key={index}>
				<Radio
					value={brand}
					name={brand}
					checked={brand === selectedBrand}
					onChange={handleBrand}
					className="pb-1 pl-1 pr-4"
				>
					{brand}
				</Radio>
			</div>
		));
	};

	const handleBrand = (e) => {
		// RESET PREVIOUS SEARCH OPTIONS
		setSelectedSub('');
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});

		setPrice([ 0, 20000 ]);
		setSelectedCategories([]);
		setStar('');
		setSelectedColor('');
		setSelectedShippingOption('');

		setSelectedBrand(e.target.value);
		fetchProducts({ brand: e.target.value });
	};

	// ************************************************
	// 		7. load products based on color
	// ************************************************
	const showColors = () => {
		return colors.map((color, index) => (
			<div key={index}>
				<Radio
					value={color}
					name={color}
					checked={color === selectedColor}
					onChange={handleColor}
					className="pb-1 pl-1 pr-4"
				>
					{color}
				</Radio>
			</div>
		));
	};

	const handleColor = (e) => {
		// RESET PREVIOUS SEARCH OPTIONS
		setSelectedSub('');
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});

		setPrice([ 0, 20000 ]);
		setSelectedCategories([]);
		setStar('');
		setSelectedBrand('');
		setSelectedShippingOption('');

		setSelectedColor(e.target.value);
		fetchProducts({ color: e.target.value });
	};

	// ************************************************
	// 		8. load products based on shipping
	// ************************************************
	const showShippingOptions = () => {
		return (
			<React.Fragment>
				<Checkbox
					className="pb-2 pl-4 pr-4"
					onChange={handleShippingOption}
					value="Yes"
					checked={selectedShippingOption === 'Yes'}
				>
					Yes
				</Checkbox>
				<Checkbox
					className="pb-2 pl-4 pr-4"
					onChange={handleShippingOption}
					value="No"
					checked={selectedShippingOption === 'No'}
				>
					No
				</Checkbox>
			</React.Fragment>
		);
	};

	const handleShippingOption = (e) => {
		// RESET PREVIOUS SEARCH OPTIONS
		setSelectedSub('');
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 20000 ]);
		setSelectedCategories([]);
		setStar('');
		setSelectedBrand('');
		setSelectedColor('');

		setSelectedShippingOption(e.target.value);
		fetchProducts({ shipping: e.target.value });
	};

	return (
		<React.Fragment>
			<Layout>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-3 pt-2">
							<h4>Search/Filter</h4>
							<hr />
							<div>
								<Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
									{React.createElement(menuCollpased ? MenuUnfoldOutlined : MenuFoldOutlined)}
								</Button>
								<Menu
									defaultSelectedKeys={[ '1' ]}
									defaultOpenKeys={[ 'sub1', 'sub2', 'sub3', 'sub4' ]}
									mode="inline"
									theme="light"
									inlineCollapsed={menuCollpased}
								>
									<SubMenu key="sub1" title="Price" icon={<DollarOutlined />}>
										<div>
											<Slider
												className="ml-4 mr-4"
												range
												tipFormatter={(v) => `$${v}`}
												value={price}
												onChange={handleSlider}
												max="20000"
											/>
										</div>
									</SubMenu>

									<SubMenu key="sub2" title="Category" icon={<DownSquareOutlined />}>
										<div style={{ marginTop: '10px' }}>{showCategories()}</div>
									</SubMenu>

									{/* stars */}
									<SubMenu key="sub3" title="Rating" icon={<StarOutlined />}>
										<div style={{ marginTop: '10px' }}>{showStars()}</div>
									</SubMenu>

									<SubMenu key="sub4" title="Sub Categories" icon={<TagsOutlined />}>
										<div style={{ marginTop: '10px' }} className="pl-4 pr-4">
											{showSubs()}
										</div>
									</SubMenu>
									<SubMenu key="sub5" title="Brands" icon={<TrademarkOutlined />}>
										<div style={{ marginTop: '10px' }} className="pl-4 pr-4">
											{showBrands()}
										</div>
									</SubMenu>
									<SubMenu key="sub6" title="Colors" icon={<BgColorsOutlined />}>
										<div style={{ marginTop: '10px' }} className="pl-4 pr-4">
											{showColors()}
										</div>
									</SubMenu>
									<SubMenu key="sub7" title="Shipping" icon={<DingtalkOutlined />}>
										<div style={{ marginTop: '10px' }} className="pl-4 pr-4">
											{showShippingOptions()}
										</div>
									</SubMenu>
								</Menu>
							</div>
						</div>
						<div className="col-md-9 pt-2">
							{loading ? <LoadingOutlined /> : <h4 className="text-danger"> Products </h4>}
							{products.length < 1 && <p>No products found</p>}

							<div className="row pb-5">
								{products.map((p) => (
									<div key={p._id} className="col-md-4 mt-3">
										<ProductCard product={p} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export async function getServerSideProps({ query }) {
	return getProductByCount(12).then((p) => {
		return getCategories().then((c) => {
			return getSubs().then((s) => {
				return {
					props: {
						products_from_db: p.data,
						categories_from_db: c.data,
						subs_from_db: s.data
					}
				};
			});
		});
	});
}

export default ShopPage;
