import React from 'react';

const Review = ({review}) => {
	console.log(review)
	return(
		<div className='Review__wrapper'>
			{review.user.first_name}
			{review.created_at.slice(0,10)}
			
			{review.comment}
		</div>
	)
}

export default Review;