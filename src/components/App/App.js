import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from '../HomePage';
// import Product from '../Product';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/*<Switch>
          <Route path='/' exact component={ HomePage }/>
          <Route path='/product' component={ Product }/>
        </Switch>*/}
      </div>
    );
  }
}

export default App;