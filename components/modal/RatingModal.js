import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import Router from 'next/router';

function RatingModal({ children, handleSubmitRating }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [ modalVisible, setModalVisible ] = useState(false);

	const handleModal = (e) => {
		if (user && user.token) {
			setModalVisible(true);
		} else {
			// IMPROVEMENT TO BE DONE: save the current pathname to redux and in login page check after login if the previous pathname is there and redirect there instead
			Router.push('/auth/login');
		}
	};

	return (
		<React.Fragment>
			<div onClick={handleModal}>
				<StarOutlined className="text-danger" /> <br />
				{user ? 'Leave rating' : 'Login to leave rating'}
			</div>
			<Modal
				title="Leave your rating"
				centered
				visible={modalVisible}
				onOk={() => {
					setModalVisible(false);
					handleSubmitRating();
					toast.success('Thanks for your review. It will visible soon');
				}}
				onCancel={() => {
					setModalVisible(false);
				}}
			>
				{children}
			</Modal>
		</React.Fragment>
	);
}

export default RatingModal;
