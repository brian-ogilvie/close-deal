import React from 'react'
import axios from 'axios'

class UpdateProduct extends React.Component {
  constructor(){
    super()
    this.state={
      isUpdated: false
    }
  }

  // handleProductFromChange = (event) => {
  //   const element = event.target
  //   const {name, value} = element
  //
  //   this.setState
  // }
  render(){
    return(
      <div><h1>updateForm</h1></div>
    )
  }
}

export default UpdateProduct
