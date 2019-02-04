import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ''
    }
  }

  render() {
    return (
      <div className="Header">
        <header>
          <h1 className="Header__logo">Shopping App</h1>
          <nav>
            <ul className="Header__nav">
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/products">Browse</Link></li>
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/sell">Sell</Link></li>
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/profile">Profile</Link></li>
              <li className="Header__nav-item"><Link className="Header__nav-link" to="/login">Login/Register</Link></li>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default Header