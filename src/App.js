import React, { Component } from 'react';
import './App.css';
import { Switch, withRouter, Route } from 'react-router-dom';

import Header from './component/Navbar/navbar';

import Marketing from "./component/Marketing/Marketing";
import Customer from './component/Marketing/Customer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Marketing} />
          <Route path="/customer" exact component={Customer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);