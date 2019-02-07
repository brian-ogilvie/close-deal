import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import ProductDetail from '../ProductDetail/ProductDetail'
import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import Login from '../Login/Login'
import SellProduct from '../SellProduct/SellProduct'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import UserProfile from '../UserProfile/UserProfile'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      loggedIn: false,
      loginVisible: false,
      loginLeaving: false,
      requester: null,
    }
    this.loginResult = this.loginResult.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  loginResult({user, loggedIn}) {
    this.setState({user, loggedIn})
  }

  async showLogin(requester) {
    if (requester) {
      await this.setState({requester})
    }
    this.setState({
      loginVisible: true
    })
  }

  async closeLogin(requester) {
    await this.setState({loginLeaving: true})
    setTimeout(async () => {
      await this.setState({
        loginVisible: false,
        loginLeaving: false,
        requester: null
      })
      if (requester) {
        return <Redirect to={requester} />
      }
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
        {this.state.loginVisible && <Login requester={this.state.requester} loginResult={this.loginResult} requestClose={this.closeLogin} leaving={this.state.loginLeaving}/> }
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' exact component={ ProductsList }/>
            <Route path='/products/:id' exact render={props => {
              return <ProductDetail id={props.match.params.id} user={this.state.user}/>
            }} />
            <Route path='/seller/:id' render={props => {
              return <UserProfile userId={props.match.params.id} currentUser={this.state.user} />
            }} />
            <Route path='/sell' render={()=>{
              if(this.state.user){
                return <SellProduct user_id={this.state.user.id}/>
              } else {
                this.showLogin()
                return <Redirect to='/products' />
              }
            }} />
            <Route path='/profile' render={() => {
              if (this.state.user) {
                return <UserProfile userId={this.state.user.id} currentUser={this.state.user} />
              } else {
                this.showLogin()
                return <Redirect to='/products' />
              }
            }} />
            <Route path='/update-product/:id' exact render={(props)=> {
              if(this.state.user){
                return <UpdateProduct id={props.match.params.id} user={this.state.user} />
            }}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
