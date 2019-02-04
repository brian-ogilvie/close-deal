import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
            <Route path='/products' component={ ProductsList }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;