import React from 'react';
import Rodal from 'rodal';
import './Family.css';

// include styles
import 'rodal/lib/rodal.css';

export class TextMessages extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          enterMessage: "",
          messages: [],
          visible: false };
    }

    componentDidMount() {
      var self = this;
      fetch("https://localhost:8080/text/" + self.props.family.primaryPhone)
        .then(res => res.json())
        .then(data => this.setState({
          messages: data
        }));
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    onChange(e) {
      var self = this;
      this.setState({
        enterMessage: e.target.value
      })
    }

    handleSubmit() {
      var self = this;
      fetch("https://localhost:8080/sendsms", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          message: self.state.enterMessage,
          phone: "+" + self.props.family.primaryPhone
        })
      })
    }

    render() {
        const messages = this.state.messages.map(message => {
          return <div className="alert alert-success">{message.text}</div>
        })
        console.log(this.state.messages)
        return (
            <div>

              <div className="well card-5 col-md-1" style={{marginLeft: 20, marginRight: 20}} onClick={this.show.bind(this)}>
                <i className="fa fa-comments" aria-hidden="true"></i> Text Messages
              </div>

                <Rodal animation="rotate" visible={this.state.visible} onClose={this.hide.bind(this)}>
                  <div style={{margin: 20}}>
                    {messages}
                  </div>
                  <div>
                  {this.state.enterMessage}
                  <div className="input-group">
                    <span className="input-group-addon">Text</span>
                    <div className="row">
                      <div className="col-md-8">
                        <input onChange={this.onChange} id="msg" type="text" class="form-control" name="msg" placeholder="Send Message"/>
                      </div>
                      <div className="col-md-4">
                        <button style={{width: 200}} onClick={this.handleSubmit} style={{padding: 4}}><i className="fa fa-paper-plane" aria-hidden="true"></i>Send</button>
                      </div>
                    </div>
                  </div>
                  </div>
                </Rodal>
            </div>
        )
    }
}
