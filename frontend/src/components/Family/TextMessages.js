import React from 'react';
import Rodal from 'rodal';
import './Family.css';

// include styles
import 'rodal/lib/rodal.css';

export class TextMessages extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>

              <div className="well card-5 col-md-1" style={{marginLeft: 20, marginRight: 20}} onClick={this.show.bind(this)}>
                <i className="fa fa-comments" aria-hidden="true"></i> Text Messages
              </div>

                <Rodal animation="rotate" visible={this.state.visible} onClose={this.hide.bind(this)}>
                    <div>House Head: {this.props.family.houseHead}</div>
                    <div>Employment Status: {this.props.family.employment ? "Employed" : "Not Employed"}</div>
                    <div>Graduation Status: {this.props.family.employment ? "Graduated" : "Not Graduated"}</div>
                    <div>Email: {this.props.family.email}</div>
                    <div>Primary Phone: {this.props.family.primaryPhone}</div>
                    <div>Secondary Phone: {this.props.family.secondaryPhone}</div>
                    <div>Case Worker Id: {this.props.family.caseWorker}</div>
                </Rodal>
            </div>
        )
    }
}
