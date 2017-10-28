import React from 'react';
import Rodal from 'rodal';
import './Family.css';

// include styles
import 'rodal/lib/rodal.css';
import './NewFamily.css';

export class NewFamily extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangecaseWorkerId = this.onChangecaseWorkerId.bind(this);
        this.onChangehouseHead = this.onChangehouseHead.bind(this);
        this.onChangeprimaryPhone = this.onChangeprimaryPhone.bind(this);
        this.onChangesecondaryPhone = this.onChangesecondaryPhone.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeemployment = this.onChangeemployment.bind(this);
        this.onChangeplaceOfStay = this.onChangeplaceOfStay.bind(this);
        this.onChangegraduated = this.onChangegraduated.bind(this);
        this.state = {
          caseWorkerId: "",
          houseHead: "",
          primaryPhone: "",
          secondaryPhone: "",
          email: "",
          employment: 0,
          placeOfStay: "",
          graduated: "",
          visible: false };
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    onChangecaseWorkerId(e) {
      var self = this;
      this.setState({
        caseWorkerId: e.target.value
      })
    }

    onChangehouseHead(e) {
      var self = this;
      this.setState({
        houseHead: e.target.value
      })
    }

    onChangeprimaryPhone(e) {
      var self = this;
      this.setState({
        primaryPhone: e.target.value
      })
    }

    onChangesecondaryPhone(e) {
      var self = this;
      this.setState({
        secondaryPhone: e.target.value
      })
    }

    onChangeemail(e) {
        var self = this;
        this.setState({
          email: e.target.value
        })
    }

    onChangeemployment(e) {
      var self = this;
      this.setState({
        employment: e.target.value
      })
    }

    onChangeplaceOfStay(e) {
      var self = this;
      this.setState({
        placeOfStay: e.target.value
      })
    }

    onChangegraduated(e) {
      var self = this;
      this.setState({
        graduated: e.target.value
      })
    }


    handleSubmit() {
      var self = this;
      fetch("https://localhost:8080/family", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          caseWorkerId: self.state.caseWorkerId,
          houseHead: self.state.houseHead,
          primaryPhone: self.state.primaryPhone,
          secondaryPhone: self.state.secondaryPhone,
          email: self.state.email,
          employment: self.state.employment,
          placeOfStay: self.state.placeOfStay,
          graduated: self.state.graduated
        })
      })
    }

    render() {
        return (
            <div>

              <div className="well card-3 col-md-1" style={{marginLeft: 20, marginRight: 20, borderRadius: "50%"}} onClick={this.show.bind(this)}>
                <i className="fa fa-users" aria-hidden="true"></i> New Family
              </div>

                <Rodal animation="rotate" visible={this.state.visible} onClose={this.hide.bind(this)}>
                  <div>
                    <input onChange={this.onChangecaseWorkerId} placeholder="Case Worker Id"/>
                    <input onChange={this.onChangehouseHead} placeholder="House Head"/>
                    <input onChange={this.onChangeprimaryPhone} placeholder="Primary Phone"/>
                    <input onChange={this.onChangesecondaryPhone} placeholder="Secondary Phone"/>
                    <input onChange={this.onChangeemail} placeholder="Email"/>
                    <input onChange={this.onChangeplaceOfStay} placeholder="Place of Stay"/>
                    <input onChange={this.onChangeemployment} placeholder="Employment"/>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                  </div>
                </Rodal>
            </div>
        )
    }
}
