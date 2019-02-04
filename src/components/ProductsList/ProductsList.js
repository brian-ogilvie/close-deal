import React from 'react'
import './ProductsList.css'
import axios from 'axios'
import Product from '../Product/Product'
import SearchBar from '../SearchBar/SearchBar'

class ProductsList extends React.Component {
  constructor() {
    super()
    this.state = {
      products: [],
      searchTerm: '',
    }
    this.getProducts = this.getProducts.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
  }

  async getProducts() {
    const res = await axios.get('/products')
    const products = res.data
    this.setState({products})
  }

  filterProducts(searchTerm) {
    this.setState({searchTerm})
  }

  componentDidMount() {
    this.getProducts()
  }
  render() {
    const products = this.state.products.filter(product => {
      const searchTerm = this.state.searchTerm.toLowerCase()
      if (searchTerm) {
        return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
      } else {
        return true
      }
    })
    .map(product => {
      return <Product key={product.id} product={product} />
    })
  	return (
  	    <div className="ProductsList">
          <div className="ProductsList__top-line">
            <h2 className="ProductsList__heading">Items for sale in New York</h2>
            <SearchBar filterProducts={this.filterProducts} />
          </div>
          <div className="ProductsList__list">
            {products}
          </div>
        </div>
  	)
  }
}

export default ProductsList
