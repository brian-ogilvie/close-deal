import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import CreateProductPage from '../CreateProductPage/CreateProductPage'
import Login from '../Login/Login'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      loggedIn: false,
      loginVisible: false,
    }
    this.loginResult = this.loginResult.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  loginResult({user, loggedIn}) {
    this.setState({user, loggedIn})
  }

  showLogin() {
    this.setState({
      loginVisible: true
    })
  }

  closeLogin() {
    this.setState({
      loginVisible: false
    })
  }

  logout() {
    this.setState({
      user: null,
      loggedIn: false
    })
  }

  render() {
    return (
      <div className="container">
        <Header showLogin={this.showLogin} loggedIn={this.state.loggedIn} requestLogout={this.logout} />
        
        {this.state.loginVisible && <Login loginResult={this.loginResult} requestClose={this.closeLogin}/> }
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' component={ ProductsList }/>
            <Route path='/sell' component={ CreateProductPage }/>
            <Route path='/profile' component={ ProductsList }/>
            <Route path='/login' component={ ProductsList }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;