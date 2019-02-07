import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import ProductDetail from '../ProductDetail/ProductDetail'
import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import Login from '../Login/Login'
import SellProduct from '../SellProduct/SellProduct'
import UpdateProduct from '../UpdateProduct/UpdateProduct'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      loggedIn: false,
      loginVisible: false,
      loginLeaving: false,
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

  async closeLogin() {
    await this.setState({loginLeaving: true})
    setTimeout(() => {
      this.setState({
        loginVisible: false,
        loginLeaving: false
      })
    }, 1000)
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

        {this.state.loginVisible && <Login loginResult={this.loginResult} requestClose={this.closeLogin} leaving={this.state.loginLeaving}/> }
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' exact component={ ProductsList }/>
            <Route path='/products/:id' exact render={props => {
              return <ProductDetail id={props.match.params.id} user={this.state.user}/>
            }}/>
            <Route path='/sell' render={()=>{
              if(this.state.user){
                return <SellProduct user_id={this.state.user.id}/>
              } else {
                this.showLogin()
                return <Redirect to='/products' />
              }
            }} />
            <Route path='/profile' component={ ProductsList }/>
            <Route path='/update-product/:id' component={UpdateProduct} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
