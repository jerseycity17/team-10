// ./src/pages/ThankYou.js
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import './Header.css';

class Header extends Component {
  render() {
    return(
      <ul className="nav nav-tabs col-md-12">
        <li><button className="btn btn-primary" onClick={() => this.props.history.push('/')}>Home</button></li>
        <li><button className="btn btn-primary" onClick={() => this.props.history.push('/thanks')}>Family</button></li>
        <li><button className="btn btn-primary" onClick={() => this.props.history.push('/thirdpage')}>Resources</button></li>
      </ul>
    )
  }
}

export default withRouter(Header);
