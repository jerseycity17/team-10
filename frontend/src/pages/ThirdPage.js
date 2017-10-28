// ./src/pages/ThankYou.js
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {ModalExample} from '../components/ModalExample';

class ThirdPage extends Component {
  render() {
    return(
      <div>
        <h2>Thank you!</h2>
        <p>This is the third page woot!</p>
        <button onClick={() => this.props.history.push('/')}>Back to Page One</button>
        <ModalExample />
      </div>
    )
  }
}
export default withRouter(ThirdPage);
