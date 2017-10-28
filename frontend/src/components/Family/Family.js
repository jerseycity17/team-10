import React from 'react';
import Rodal from 'rodal';
import { TextMessages } from './TextMessages';
import { VoiceTranscripts } from './VoiceTranscripts';
import './Family.css';

// include styles
import 'rodal/lib/rodal.css';

export class Family extends React.Component {

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
                <div style={{fontSize: 16}} className="well card-5 col-md-6 col-md-offset-2" onClick={this.show.bind(this)}>
                  <div className="row">
                    <div className="col-md-4"><span className="househead"><i className="fa fa-user" aria-hidden="true"></i> {this.props.family.houseHead}</span></div>
                    <div className="col-md-4"><span className="phone"><i className="fa fa-phone" aria-hidden="true"></i> {this.props.family.primaryPhone}</span></div>
                    <div className="col-md-4"><span className="employment"><i className="fa fa-money" aria-hidden="true"></i>{this.props.family.employment ? "Employed" : "Not Employed"}</span></div>
                  </div>
                </div>

                <TextMessages family={this.props.family}/>

                <VoiceTranscripts family={this.props.family}/>

                <Rodal animation="rotate" width={500} height={400} visible={this.state.visible} onClose={this.hide.bind(this)}>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-user" aria-hidden="true"></i><strong>House Head:</strong> {this.props.family.houseHead}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-money" aria-hidden="true"></i><strong>Employment Status:</strong> {this.props.family.employment ? "Employed" : "Not Employed"}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-graduation-cap" aria-hidden="true"></i><strong>Graduation Status:</strong> {this.props.family.employment ? "Graduated" : "Not Graduated"}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-envelope-o" aria-hidden="true"></i><strong>Email:</strong> {this.props.family.email}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-phone-square" aria-hidden="true"></i><strong>Primary Phone:</strong> {this.props.family.primaryPhone}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><i className="fa fa-phone" aria-hidden="true"></i><strong>Secondary Phone:</strong> {this.props.family.secondaryPhone}</div>
                    <div style={{fontSize: 20, marginBottom: 20}}><strong>Case Worker Id:</strong> {this.props.family.caseWorker}</div>
                </Rodal>
            </div>
        )
    }
}
