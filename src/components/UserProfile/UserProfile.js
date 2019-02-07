import React from 'react'
import './UserProfile.css'
import axios from 'axios'
import { getAverage } from '../../utils'
import UserProduct from '../UserProduct/UserProduct'

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
      console.log(user)
      this.setState({user})
    } catch (e) {
      console.log(e.message)
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  render() {
    console.log(this.props)
    const user = this.state.user
    if (user) {
      const products = user.products.map(product => {
        return <UserProduct key={product.id} product={product} />
      })
      return (
        <div className="UserProfile">
          <h1 className="UserProfile__page-title">{`${user.first_name} ${user.last_name}`}</h1>
          <div className="UserProfile__products">
            {products}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default UserProfile