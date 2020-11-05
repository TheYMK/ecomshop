import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux'; // useSelector used to get data from the state
import Router from 'next/router';

const { SubMenu, Item } = Menu;

function Header() {
	const [ current, setCurrent ] = useState('home');
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();

		dispatch({
			type: 'LOGOUT',
			payload: null
		});

		Router.push('/auth/login');
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[ current ]} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link href="/">
					<a>Home</a>
				</Link>
			</Item>

			{!user && (
				<Item key="register" icon={<UserAddOutlined />} className="float-right">
					<Link href="/auth/register">
						<a>Register</a>
					</Link>
				</Item>
			)}

			{!user && (
				<Item key="login" icon={<UserOutlined />} className="float-right">
					<Link href="/auth/login">
						<a>Login</a>
					</Link>
				</Item>
			)}

			{user && (
				<SubMenu
					icon={<SettingOutlined />}
					title={user.email && user.email.split('@')[0]}
					className="float-right"
				>
					{user &&
					user.role === 'subscriber' && (
						<Item key="setting:1">
							<Link href="/user/history">
								<a>
									<Item key="setting:1">Dashboard</Item>
								</a>
							</Link>
						</Item>
					)}

					{user &&
					user.role === 'admin' && (
						<Item key="setting:1">
							<Link href="/admin/dashboard">
								<a>
									<Item key="setting:1">Dashboard</Item>
								</a>
							</Link>
						</Item>
					)}

					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
}

export default Header;
