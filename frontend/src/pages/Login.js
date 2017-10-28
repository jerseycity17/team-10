// ./src/pages/ThankYou.js
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="col-md-4 col-md-offset-4">
        <div className="login card-5">
          <div>
            <img style={{height: "85%", width: "85%", padding: 10}} src="http://familypromise.org/wp-content/themes/wideeyecreative/images/logo.png"/>
            <div className="text-center" style={{fontSize: 30}}>Caseworker Login</div>
            <form className="text-center col-md-8 col-md-offset-2" style={{marginTop: 20}}>
              <div className="form-group">
                <label>Username</label>
                <input className="form-control" id="email"/>
              </div>
              <div className="form-group">
                <label for="pwd">Password</label>
                <input type="password" className="form-control" id="pwd"/>
              </div>
              <button onClick={() => this.props.history.push('/family')} style={{width: 200, borderRadius: 0}}className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Login);
