import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './UpdateProduct.css'

class UpdateProduct extends React.Component {
  constructor(props){
    super(props)
    this.state={
      product: {
        name: "",
        description: "",
        price: "",
        image_url: ""
      },
      isUpdated: false,
      userIsSeller: false
    }
  }

  getData = async () => {
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

  componentDidMount(){
    this.getData()
  }

  onEditProductFormSubmit = async (event) => {
    event.preventDefault()

    let updateProduct = {
      name: this.state.product.name,
      description: this.state.product.description,
      price: this.state.product.price,
      image_url: this.state.product.image_url,
      user_id: this.props.user.id
    }

    await axios.put(`/products/${this.state.product.id}`, updateProduct)

    this.setState({isUpdated:true})
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

    if(!this.state.userIsSeller){
      return(
        <div className='UpdateProduct__PermissionDenied'>
          <h1>Permission Denied</h1>
        </div>
      )
    }

    if(this.state.isUpdated === true){
      return <Redirect to={`/products/${this.props.id}`} />
    }

    return(
      <div className='UpdateProduct__wrapper'>
        <h1>Edit Product Information</h1>
        <form onSubmit={ this.onEditProductFormSubmit }>
          <div className="UpdateProduct__field">
            <label htmlFor="name" className='UpdateProduct__label'>Name: </label>
            <input
              className='UpdateProduct__input'
              type="text"
              name="name"
              placeholder="Be accurate as possible."
              value={this.state.product.name}
              onChange={this.onProductFormChange}
            />
          </div>
          <div className="UpdateProduct__field">
            <label htmlFor="description" className='UpdateProduct__label'>Description: </label>
            <textarea
              className='UpdateProduct__textarea'
              type="text"
              name="description"
              placeholder="Detailed descriptions help sell your item quickly!"
              rows="5"
              cols="22"
              value={this.state.product.description}
              onChange={this.onProductFormChange}
            />
          </div>

         <div className="UpdateProduct__field">
             <label htmlFor="price" className='UpdateProduct__label'>Price: </label>
              <input
                className='UpdateProduct__input'
                type="text"
                name="price"
                placeholder="How much are you looking to sell it for?"
                value={this.state.product.price}
                onChange={this.onProductFormChange}
              />
          </div>

          <div className="UpdateProduct__field">
            <label htmlFor="image" className='UpdateProduct__label'>Image URL: </label>
            <input
              className='UpdateProduct__input'
              type="text"
              name="image_url"
              placeholder="Direct upload is not supported at this time."
              value={this.state.product.image_url}
              onChange={this.onProductFormChange}
            />
          </div>

          <div className="UpdateProduct__submit">
            <button type="submit" className="button">Update</button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateProduct
