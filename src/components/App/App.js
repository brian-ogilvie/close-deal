import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css'

import ProductDetail from '../ProductDetail/ProductDetail'
import Header from '../Header/Header'
import ProductsList from '../ProductsList/ProductsList'
import CreateProductPage from '../CreateProductPage/CreateProductPage'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <ProductDetail />
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