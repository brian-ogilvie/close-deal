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
        password2: '',
        first_name: '',
        last_name: ''
      },
      user: null,
      loggedIn: false,
      loginOrRegister: 'login',
    }
    this.onFormChange = this.onFormChange.bind(this)
    this.performLogin = this.performLogin.bind(this)
    this.toggleLoginOrRegister = this.toggleLoginOrRegister.bind(this)
    this.performRegister = this.performRegister.bind(this)
    this.validateForm = this.validateForm.bind(this)
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

  async performLogin(e) {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', this.state.form)
      const {user, loggedIn} = res.data
      this.props.loginResult({user, loggedIn})
      if (user) {
        this.props.requestClose(this.props.requester)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  validateForm() {
    const {password, password2} = this.state.form
    const isValid = password === password2
    const message = isValid ? 'Passwords match' : 'Passwords do not match'
    return {isValid, message}
  }

  async performRegister(e) {
    e.preventDefault()
    const validation = this.validateForm()
    if (!validation.isValid) {
      return console.log(validation.message)
    }
    try {
      const res = await axios.post('/users/register', this.state.form)
      if (!res.data.user) {
        return console.log(res.data.message)
      }
      const {user} = res.data
      if (user) {
        this.setState({loginOrRegister: 'login'})
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  toggleLoginOrRegister() {
    this.setState(prevState => {
      const loginOrRegister = prevState.loginOrRegister === 'login' ? 'register' : 'login'
      return {loginOrRegister}
    })
  }

  renderLoginRegisterForm() {
    if (this.state.loginOrRegister === 'login') {
      return (
        <form className="Login__form" onChange={this.onFormChange} onSubmit={this.performLogin}>
          <label className="Login__label" htmlFor="email">Email</label>
          <input className="Login__input" type="text" name="email" />
          <label className="Login__label" htmlFor="password">Password</label>
          <input className="Login__input" type="password" name="password" />
          <button className="Login__submit">Log in</button>
          <hr className="Login__break" />
        </form>
      )
    } else {
      return (
        <form className="Login__form" onChange={this.onFormChange} onSubmit={this.performRegister}>
          <label className="Login__label" htmlFor="first_name">First Name</label>
          <input className="Login__input" type="text" name="first_name" />
          <label className="Login__label" htmlFor="last_name">Last Name</label>
          <input className="Login__input" type="text" name="last_name" />
          <label className="Login__label" htmlFor="email">Email</label>
          <input className="Login__input" type="text" name="email" />
          <label className="Login__label" htmlFor="password">Password</label>
          <input className="Login__input" type="password" name="password" />
          <label className="Login__label" htmlFor="password2">Retype Password</label>
          <input className="Login__input" type="password" name="password2" />
          <button className="Login__submit">Create Account</button>
          <hr className="Login__break" />
        </form>
      )
    }
  }

  render() {
    const loginClassName = 'Login' + (this.props.leaving ? ' Login--leaving' : '')
    const headingText = this.state.loginOrRegister === 'login' ? 'Sign In' : 'Create an Account'
    const toggleText = this.state.loginOrRegister === 'login' ? 'Create an account' : 'Already a member? Sign in!'
    return (
      <div className={loginClassName}>
        <h2 className="Login__heading">{headingText}</h2>
        <button className="Login__close" onClick={this.props.requestClose}>X</button>
        { this.renderLoginRegisterForm() }
        <button className="Login__register" onClick={this.toggleLoginOrRegister}>{toggleText}</button>
      </div>
    )
  }
}

export default Login
