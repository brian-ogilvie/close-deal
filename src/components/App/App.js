import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' component={ ProductsList }/>
            <Route path='/sell' component={ ProductsList }/>
            <Route path='/profile' component={ ProductsList }/>
            <Route path='/login' component={ ProductsList }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
