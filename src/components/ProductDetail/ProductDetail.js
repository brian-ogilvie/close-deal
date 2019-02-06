import React, { Component } from 'react'
import axios from 'axios'
import "./ProductDetail.css"
import Review from '../Review/Review'

class ProductDetail extends Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
    this.getData = this.getData.bind(this)
  }

  async getData() {
    const url = `/products/${this.props.id}`
    try {
      const res = await axios.get(url)
      const product = res.data
      this.setState({
        product
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const seller = this.state.product.sold_by ? this.state.product.sold_by : {first_name: '', last_name: ''}
    const reviewsOnSeller = this.state.product.sold_by ? this.state.product.sold_by.subject_of_reviews.map(review => {
      return <Review review={review} />
    }) : 'This person has no reviews yet'
    return(
      <div className="ProductDetail__container">
        <div className="ProductDetail__details-container">
          <div className="ProductDetail__image-wrapper">
            <img className="ProductDetail__image" src={this.state.product.image_url} alt={this.state.product.name}/>
          </div>
          <div className="ProductDetail__info-container">
            <h2>Seller: {seller.first_name}</h2>
            <h2>{this.state.product.name}</h2>
            <h2>${this.state.product.price}</h2>
            <p>{this.state.product.description}</p>
          </div>
        </div>
        <div className="ProductDetail__review-container">
          {reviewsOnSeller}
        </div>
      </div>
    )
  }
}

export default ProductDetail
