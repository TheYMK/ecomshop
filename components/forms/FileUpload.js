import React from 'react';
import { Upload, message, Avatar, Badge } from 'antd';
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../config';

const { Dragger } = Upload;
// CHANGE THIS TO ANT DESIGN DRAG AND DROP FILE COMPONENT
function FileUpload({ values, setValues, setLoading, loading }) {
	const { images } = values;

	const { user } = useSelector((state) => ({ ...state }));

	const fileUploadAndResize = (e) => {
		// resize
		let files = e.target.files;
		let allUploadedFiles = images;

		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					'JPEG',
					100,
					0,
					(uri) => {
						axios
							.post(
								`${API_URL}/uploadimages`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : ''
									}
								}
							)
							.then((res) => {
								console.log('Image Upload Res Data', res);
								setLoading(false);
								allUploadedFiles.push(res.data);

								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log(err);
								setLoading(false);
							});
					},
					'base64'
				);
			}
		}
		// send back to server to upload to cloudinary
		// set url to images[] in the parent component - ProductCreatePage
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		axios
			.post(
				`${API_URL}/removeimage`,
				{ public_id: public_id },
				{
					headers: {
						authtoken: user ? user.token : ''
					}
				}
			)
			.then((res) => {
				setLoading(false);
				let filteredImages = images.filter((image) => {
					return image.public_id !== public_id;
				});

				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			<div className="row">
				{images &&
					images.map((image) => (
						<Badge
							count="X"
							key={image.public_id}
							onClick={() => handleImageRemove(image.public_id)}
							style={{ cursor: 'pointer' }}
						>
							<Avatar src={image.url} size={100} className="ml-3 mb-3" shape="square" />
						</Badge>
					))}
			</div>

			<div className="row">
				<label className="btn btn-primary btn-raised">
					{loading ? <LoadingOutlined /> : 'Upload images'}
					<input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
				</label>
			</div>
		</React.Fragment>
	);
}

export default FileUpload;
