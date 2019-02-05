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
        <main>
          <Switch>
            <Route path='/' exact render={() => {
              return <Redirect to='/products' />
            }} />
            <Route path='/products' exact component={ ProductsList }/>
            <Route path='/products/:id' exact render={props => {
              return <ProductDetail id={props.match.params.id} />
            }} />
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
