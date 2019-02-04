import React from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import './ProductsList.css'

class ProductsList extends React.Component {
  constructor() {
    super()
    this.state = {
      products: [],
    }
    this.getProducts = this.getProducts.bind(this)
  }

  async getProducts() {
    const res = await axios.get('/products')
    const products = res.data
    this.setState({products})
  }

  componentDidMount() {
    this.getProducts()
  }
  render() {
    const products = this.state.products.map((product, i) => {
      return <Product key={i} product={product} />
    })
  	return (
  	    <div className="ProductsList">
          <h1>Products List</h1>
          <div className="ProductsList__list">
            {products}
          </div>
        </div>
  	)
  }
}

export default ProductsList
