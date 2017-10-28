// ./src/App.js
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import Subscribe from './pages/Subscribe'
import ThankYou from './pages/ThankYou'
import ThirdPage from './pages/ThirdPage'
import PageShell from './components/PageShell'
import Header from './components/Header/Header';
import {Family} from './components/Family/Family';
import FamilyPage from './pages/FamilyPage';
import Login from './pages/Login';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App container-fluid">
        <Route path="/login" exact component={PageShell(Login)}></Route>
        <Route path="/" exact component={PageShell(Login)}></Route>
        <Route path="/family" exact component={PageShell(FamilyPage)}></Route>
      </div>
    );
  }
}
export default App;
