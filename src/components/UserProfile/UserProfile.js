import React from 'react'
import './UserProfile.css'
import axios from 'axios'

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
      this.setState({user})
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    console.log(this.props)
    return (
      <h1>UserProfile</h1>
    )
  }
}

export default UserProfile