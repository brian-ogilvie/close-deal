import React from 'react'
import './UserProfile.css'
import axios from 'axios'
import { getAverage, parseDate } from '../../utils'
import UserProduct from '../UserProduct/UserProduct'
import Stars from '../Stars/Stars'
import Review from '../Review/Review'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.getUserData = this.getUserData.bind(this)
  }

  async getUserData() {
    const url = `/users/${this.props.userId}`
    try {
      const res = await axios.get(url)
      const user = res.data 
      this.setState({user})
    } catch (e) {
      console.log(e.message)
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserData()
    }
  }

  render() {
    const user = this.state.user
    if (user) {
      const rating = getAverage(user.subject_of_reviews.map(review => {
        return Number(review.stars)
      }), 1)
      const products = user.products.map(product => {
        return <UserProduct key={product.id} product={product} />
      })
      const reviews = user.subject_of_reviews.map(review => {
        return <Review key={review.id} review={review} />
      })
      const joinedDate = parseDate(user.created_at)
      return (
        <div className="UserProfile">
          <div className="UserProfile__top-line">
            <div>
              <h2 className="UserProfile__page-title">{`${user.first_name} ${user.last_name}`}</h2>
              <Stars stars={rating} />
            </div>
            <h3 className="UserProfile__date">Member Since: {joinedDate}</h3>
          </div>
          <div className="UserProfile__content">
            <div className="UserProfile__products">
              <h3 className="UserProfile__section-heading">Products Currently For Sale</h3>
              {products}
            </div>
            <div className="UserProfile__reviews">
              <h3 className="UserProfile__section-heading">Reviews</h3>
              {reviews}
            </div>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default UserProfile