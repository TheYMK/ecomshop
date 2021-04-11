import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (product) => {
	if (product && product.ratings) {
		const ratingsArray = product && product.ratings;
		let total = [];
		let length = ratingsArray.length;

		ratingsArray.map((rating) => total.push(rating.star));
		let totalReduced = total.reduce((prev, next) => prev + next, 0);
		let highest = length * 5;
		let result = totalReduced * 5 / highest;

		return (
			<div className="text-center pt-1 pb-3">
				<span>
					<StarRating
						starDimension="20px"
						rating={result}
						starSpacing="2px"
						starRatedColor="red"
						editing={false}
						className
					/>
					<span className="ml-2">({product.ratings.length})</span>
				</span>
			</div>
		);
	}
};
