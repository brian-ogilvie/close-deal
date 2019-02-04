import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
  }

  async handleChange(e) {
    const searchTerm = e.target.value
    this.props.filterProducts(searchTerm)
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.onFormSubmit}>
        <input className="SearchBar__input" type="text" placeholder="Search Products" value={this.state.searchTerm} onChange={this.handleChange} />
      </form>
    )
  }
}

export default SearchBar