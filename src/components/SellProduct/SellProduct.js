import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import './SellProduct.css'

import axios from 'axios'

class SellProduct extends Component {

  constructor(){
    super()
    //sets the initial state via the constructor!
    this.state = {
      product: {
        name: "",
        description: "",
        price: "",
        image_url: ""
      },
      created: false
    }
  }

  onProductFormSubmit = async (event) => {
    event.preventDefault()

    let newProduct = {
    	name: this.state.product.name,
      description: this.state.product.description,
    	price: this.state.product.price,
    	image_url: this.state.product.image_url
    }

    await axios.post('/products', newProduct)

    this.setState({created:true})
  }

  onProductFormChange = (event) => {
  	const element = event.target
  	const {name, value} = element

  	this.setState(prevState=>{
      prevState.product[name] = value
      return prevState
    })
  }

  render(){

  	if (this.state.created === true){
  		return <Redirect to="/" />
  	}

    return (
      <div className="SellProduct__wrapper">
        <form onSubmit={ this.onProductFormSubmit } >

        	<div className="SellProduct__field">
	        	<label htmlFor="name">Name: </label>
	          <input
	            type="text"
	            name="name"
	            placeholder="Be accurate as possible."
	            value={this.state.product.name}
              onChange={this.onProductFormChange}
	          />
          </div>
        	<div className="SellProduct__field">
	        	<label htmlFor="description">Description: </label>
	          <textarea
	            type="text"
	            name="description"
	            placeholder="Detailed descriptions help sell your item quickly!"
              rows="5"
              cols="22"
	            value={this.state.product.description}
              onChange={this.onProductFormChange}
	          />
          </div>

	       <div className="SellProduct__field">
	           <label htmlFor="price">Price: </label>
              <input
                type="text"
                name="price"
                placeholder="How much are you looking to sell it for?"
                value={this.state.product.price}
                onChange={this.onProductFormChange}
              />
          </div>

          <div className="SellProduct__field">
            <label htmlFor="image">Image URL: </label>
            <input
              type="text"
              name="image_url"
              placeholder="Direct upload is not supported at this time."
              value={this.state.product.image_url}
              onChange={this.onProductFormChange}
            />
          </div>

	  <div className="SellProduct__submit">
	    <button type="submit" className="button">Sell my item!</button>
	  </div>
        </form>
      </div>
    )
  }
}

export default SellProduct;
