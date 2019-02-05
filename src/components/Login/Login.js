import React from 'react'
import './Login.css'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: '',
        password: '',
      },
      user: null,
      loggedIn: false,
    }
    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormChange(e) {
    const element = e.target
    const name = element.name
    const value = element.value
    this.setState(prevState => {
      prevState.form[name] = value
      return prevState
    })
  }

  async onFormSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', this.state.form)
      const {user, loggedIn} = res.data
      this.props.loginResult({user, loggedIn})
      if (user) {
        this.props.requestClose()
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  render() {
    return (
      <div className="Login">
        <h2 className="Login__heading">Sign In</h2>
        <button className="Login__close" onClick={this.props.requestClose}>X</button>
        <form className="Login__form" onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
          <label className="Login__label" htmlFor="email">Email</label>
          <input className="Login__input" type="text" name="email" />
          <label className="Login__label" htmlFor="password">Password</label>
          <input className="Login__input" type="password" name="password" />
          <button className="Login__submit">Log in</button>
          <hr className="Login__break" />
        </form>
        <button className="Login__register">Create an account</button>
      </div>
    )
  }
}

export default Login