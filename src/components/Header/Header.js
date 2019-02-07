import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ''
    }
    this.showLogin = this.showLogin.bind(this)
  }

  showLogin(e) {
    e.preventDefault()
    if (this.props.loggedIn) {
      this.props.requestLogout()
    } else {
      this.props.showLogin()
    }
  }

  render() {
    const loginText = this.props.loggedIn ? 'Log Out' : 'Login/Register'
    return (
      <div className="Header">
        <header>
          <h1 className="Header__logo"><Link className="logo-link" to="/products">CloseDeal</Link></h1>
          <nav>
            <ul className="Header__nav">
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/products">Browse</Link></li>
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/sell">Sell</Link></li>
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/profile">Profile</Link></li>
              <li className="Header__nav-item"><p className="Header__nav-link" to="#top" onClick={this.showLogin}>{loginText}</p></li>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default Header
