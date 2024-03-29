import React, { Component } from 'react'
import axios from 'axios'
import "./ProductDetail.css"
import Review from '../Review/Review'
import { Redirect, Link } from 'react-router-dom'
const moment = require('moment')

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      isDeleted: false,
      willEdit: false,
      userIsSeller: false
    }
    this.getData = this.getData.bind(this)
  }

  async getData() {
    const url = `/products/${this.props.id}`
    try {
      const res = await axios.get(url)
      const product = res.data
      if(this.props.user  && product.sold_by.id === this.props.user.id ){
        await this.setState({
          userIsSeller: true
        })
      }
      this.setState({product})
    } catch (e) {
      console.log(e.message);
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      if(this.props.user  && this.state.product.sold_by.id === this.props.user.id ){
        this.setState({userIsSeller: true})
      }
    }
  }

  onProductDelete = (product) => {
    axios.delete(`/products/${product.id}`)
      .then(res=>alert(`Product with id ${product.id} deleted`))
      .then(this.setState({isDeleted:true}))
  }

  showSellerButtons = () => {
    if(this.state.userIsSeller){
      return (
        <div>
          <button className="ProductDetail__editButton"
          onClick={()=>this.setState({willEdit:true})}>Edit</button>
          <button className="ProductDetail__deleteButton"
          onClick={()=> this.onProductDelete(this.state.product)}>Delete</button>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const userData = this.state.product
    const seller = this.state.product.sold_by ? this.state.product.sold_by : {first_name: '', last_name: ''}
    const reviewsOnSeller = this.state.product.sold_by ? this.state.product.sold_by.subject_of_reviews.map(review => {
      return <Review key={review.id} review={review} />
    }) : 'This person has no reviews yet'

    if(this.state.isDeleted === true){
      return <Redirect to={'/products/'} />
    }

    if(this.state.willEdit === true){
      return <Redirect to={`/update-product/${this.state.product.id}`}/> 
    }

    return(
      <div className="ProductDetail__container">
        <div className="ProductDetail__details-container">
          {this.showSellerButtons()}
          <div className="ProductDetail__image-wrapper">
            <img className="ProductDetail__image" src={this.state.product.image_url} alt={this.state.product.name}/>
          </div>
          <div className="ProductDetail__info-container">
            <div className="ProductDetail__info-heading">
              <h2 className="productDetail__name">{this.state.product.name}</h2>
              <h2 className="productDetail__price">${this.state.product.price ? this.state.product.price.toFixed(2) : null}</h2>
            </div>
            <h3>Seller: <Link className="ProductDetail__seller-link" to={`/seller/${seller.id}`}>{seller.first_name} {seller.last_name}</Link></h3>
            <h4 className="ProductDetail__postedOn">Posted on: {moment(userData.created_at).format('LLLL')}</h4>
            <p>Description: {this.state.product.description}</p>
          </div>
        </div>
        <div className="ProductDetail__review-container">
          <h3 className="Reviews__title">Reviews:</h3>
          {reviewsOnSeller}
        </div>
      </div>
    )
  }
}

export default ProductDetail
