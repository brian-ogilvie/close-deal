import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class UpdateProduct extends React.Component {
  constructor(props){
    super(props)
    this.state={
      product: {},
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

  // handleProductFromChange = (event) => {
  //   const element = event.target
  //   const {name, value} = element
  //
  //   this.setState
  // }
  render(){

    if(!this.state.userIsSeller){
      return(
        <div>
          <h1>Permission Denied</h1>
        </div>
      )
    }

    if(this.state.isUpdated === true){
      return <Redirect to={`/products/${this.props.id}`} />
    }

    return(
      <div><h1>updateForm</h1></div>
    )
  }
}

export default UpdateProduct
