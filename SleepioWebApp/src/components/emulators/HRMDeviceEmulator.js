/**
 * Created by sabir on 04.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ParseAPI from '../../api/ParseAPI.js'

class HRMDeviceEmulator extends React.Component {

    static defaultProps = {
        newMessagesAppearanceInterval: 1100,
        sendInterval: 2300
    }

    static propTypes = {}

    state = {
        notSentMessage: undefined,
        sending: false
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initSendingMessage();
        this.initMessageGenerating();
    }

    componentWillReceiveProps() {

    }

    initSendingMessage = () => {
        if (this.sendMessagesIntervalId  == undefined){
            this.sendMessagesIntervalId = setInterval(function(){
                this.sendMessage();
            }.bind(this), this.props.sendInterval);
        }
    }

    sendMessage = () => {
        var message = this.state.notSentMessage;
        if (message == undefined || message.breathingPoints == undefined || message.heartRatePoints == undefined){
            return;
        }
        this.setState({
            sending: true
        });
        ParseAPI.runCloudFunctionAsPromise('uploadRealtimeData', message).then(function(){
            this.setState({
                notSentMessage: undefined,
                sending: false
            });
        }.bind(this));
    }

    generateMessage = () => {
        var message = {
            breathingPoints: [{t: +new Date(), value: Math.floor(Math.random() * 120)}],
            heartRatePoints: [{t: +new Date(), value: Math.floor(Math.random() * 120)}]
        }
        var notSentMessage = this.state.notSentMessage;
        if (notSentMessage == undefined){
            notSentMessage = message;
        }else {
            notSentMessage.breathingPoints = notSentMessage.breathingPoints.concat({t: +new Date(), value: Math.floor(Math.random() * 120)});
            notSentMessage.heartRatePoints = notSentMessage.heartRatePoints.concat({t: +new Date(), value: Math.floor(Math.random() * 120)});
        }

        this.setState({
            notSentMessage: notSentMessage
        });
    }

    initMessageGenerating = () => {
        if (this.generatingIntervalId  == undefined){
            this.generatingIntervalId = setInterval(function(){
                this.generateMessage();
            }.bind(this), this.props.newMessagesAppearanceInterval);
        }
    }

    render() {
        var message = this.state.notSentMessage;

        return (
            <div style={{padding: 10, width: 540, backgroundColor: 'white', borderRadius: 4, margin: '0 auto', marginTop: 10}} >

                <div style={{marginBottom: 10}} >
                    <h2>
                        Эмулятор сигналов
                    </h2>
                </div>

                <div style={{height: 240}} >
                    <h3>
                        Накопленные данные:
                    </h3>
                    {message == undefined ? <div>нет данных</div> :
                        <div>
                            {JSON.stringify(message)}
                        </div>
                    }
                </div>

                <div style={{height: 100}} >
                    {this.state.sending == false ? null :
                        <div style={{fontSize: 20, textAlign: 'center'}} >
                            идет отправка...
                        </div>
                    }
                </div>

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//HRMDeviceEmulator = connect(mapStateToProps, mapDispatchToProps)(HRMDeviceEmulator)

export default HRMDeviceEmulator