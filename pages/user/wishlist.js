import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import { auth } from '../../actions/firebase';
import { getCurrentUser } from '../../actions/auth';
import UserNav from '../../components/nav/UserNav';
import { getAllWishlist, removeWishlist } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { DeleteOutlined } from '@ant-design/icons';

function UserWishlistPage() {
	const { user } = useSelector((state) => ({ ...state }));
	const [ wishlist, setWishlist ] = useState([]);

	useEffect(
		() => {
			loadWishlist();
		},
		[ user ]
	);

	const loadWishlist = () => {
		if (user && user.token) {
			getAllWishlist(user.token).then((res) => {
				setWishlist(res.data.wishlist);
			});
		}
	};

	const handleRemove = (productId) => {
		removeWishlist(productId, user.token).then((res) => {
			loadWishlist();
		});
	};

	return (
		<React.Fragment>
			<Layout>
				<Private>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-2">
								<UserNav />
							</div>
							<div className="col">
								<h4>Wishlist</h4>
								{wishlist.map((p) => (
									<div key={p._id} className="alert alert-secondary">
										<Link href={`/product/${p.slug}`}>
											<a>{p.title}</a>
										</Link>
										<span
											className="btn btn-sm float-right btn-raiser btn-danger"
											onClick={() => handleRemove(p._id)}
										>
											<DeleteOutlined />
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</Private>
			</Layout>
		</React.Fragment>
	);
}

export default UserWishlistPage;
