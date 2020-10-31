import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { SubMenu, Item } = Menu;

function Header() {
	const [ current, setCurrent ] = useState('home');

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[ current ]} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link href="/">
					<a>Home</a>
				</Link>
			</Item>

			<Item key="register" icon={<UserAddOutlined />} className="float-right">
				<Link href="/auth/register">
					<a>Register</a>
				</Link>
			</Item>
			<Item key="login" icon={<UserOutlined />} className="float-right">
				<Link href="/auth/login">
					<a>Login</a>
				</Link>
			</Item>

			<SubMenu icon={<SettingOutlined />} title="Username">
				<Item key="setting:1">Option 1</Item>
				<Item key="setting:2">Option 2</Item>
			</SubMenu>
		</Menu>
	);
}

export default Header;
