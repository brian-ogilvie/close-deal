import React, { Component } from 'react'
import axios from 'axios'

class ProductDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      product: null
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    console.log(this.props);
  }

  async getData() {
    const url = `/products/${this.props.id}`
    const res = await axios.get('/products/:id')
    const product = res.data
    this.setState({
      product
    })
  }

  render() {
    return(
      <div>
        this is ProductDetail
      </div>
    )
  }
}

export default ProductDetail
