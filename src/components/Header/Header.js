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
        <h1>Shopping App</h1>
        <nav>
          <ul className="Header__nav">
            <li className="Header__nav-item"><Link className="Header__nav-link" to="/products">Products for Sale</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header