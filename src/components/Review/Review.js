import React from 'react';
import './Review.css'
import { Link } from 'react-router-dom'
import Stars from '../Stars/Stars'

const moment = require('moment')

const Review = ({review}) => {
	return(
		<div className='Review__wrapper'>
			<div className="Review__top-wrapper">
				<div className="Review__name">Posted by: <Link className="Review__seller-link" to={`/seller/${review.poster.id}`}>{review.poster.first_name} {review.poster.last_name}</Link></div>
				<div className="Review__date">{moment(review.created_at).format('LLLL')}</div>
			</div>
			<hr/>
			<Stars stars={review.stars} size="small" inline="inline" />
			<div className="Review__comment">{review.comment}</div>
		</div>
	)
}

export default Review;
