// ./src/pages/ThankYou.js
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {ModalExample} from '../components/ModalExample';
import {Family} from '../components/Family/Family';
import './FamilyPage.css';

class FamilyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family: []
    }
  }
  componentDidMount() {
    fetch("http://localhost:8080/family/")
      .then(res => res.json())
      .then(data => this.setState({
        family: data
      }));
  }
  render() {
    const families = this.state.family.map(family => {
      return <Family family={family} />
    })
    return(
      <div>
        <div style={{fontSize: 20, marginBottom: 50}} className="welcome card-3 text-center well col-md-6 col-md-offset-2">
          Welcome, Name Here!
        </div>
        <div onClick={() => this.props.history.push('/login')} style={{fontSize: 20, marginLeft: 20, borderRadius: "50%", color: "red"}} className="logout well card-3 col-md-1">
          <i className="fa fa-power-off" aria-hidden="true"></i> Log Out
        </div>
        {families}
      </div>
    )
  }
}
export default withRouter(FamilyPage);
