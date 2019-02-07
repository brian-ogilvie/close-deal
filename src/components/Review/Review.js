import React from 'react';
import './Review.css'
const moment = require('moment')

const Review = ({review}) => {
	return(
		<div className='Review__wrapper'>
			<div className="Review__top-wrapper">
				<div className="Review__name">Posted by: {review.poster.first_name} {review.poster.last_name}</div>
			<div className="Review__date">{moment(review.created_at).format('LLLL')}</div>
		</div>
			<hr/>
			{review.comment}
		</div>
	)
}

export default Review;
