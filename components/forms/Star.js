import React from 'react';
import StarRating from 'react-star-ratings';

function Star({ handleStarClick, numberOfStars }) {
	return (
		<React.Fragment>
			<StarRating
				changeRating={() => handleStarClick(numberOfStars)}
				numberOfStars={numberOfStars}
				starDimension="20px"
				starSpacing="2px"
				starHoverColor="red"
				starEmptyColor="red"
			/>
		</React.Fragment>
	);
}

export default Star;
