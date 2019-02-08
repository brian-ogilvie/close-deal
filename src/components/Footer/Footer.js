import React from 'react'
import './Footer.css'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      contentVisible: false,
    }
    this.showContent = this.showContent.bind(this)
    this.hideContent = this.hideContent.bind(this)
  }

  showContent() {
    this.setState({contentVisible: true})
  }

  hideContent() {
    this.setState({contentVisible: false})
  }

  render() {
    const footerClassName = this.state.contentVisible ? 'footer--visible' : ''
    return (
      <footer className={footerClassName} onMouseEnter={this.showContent} onMouseLeave={this.hideContent}>
        <i className="fab fa-github"></i>
        <p className="footer__content">
          <a href="https://git.generalassemb.ly/brianogilvie/project3" target="_blank" rel="noopener noreferrer">View our code on GitHub!</a>
        </p>
      </footer>
    )
  }
}

export default Footer