/**
 * Created by sabir on 04.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/PusherActions.js';

import PusherHelper from '../../helpers/PusherHelper.js';


class PusherComponent extends React.Component {

    static defaultProps = {
        eventsNames: ['realtime_data']
    }

    static propTypes = {
        currentUser: PropTypes.object,
        onMessageReceived: PropTypes.func.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
        this.pusherInitialized = false;
    }

    initPusher = () => {
        console.log('initPusher occured');
        if (this.props.currentUser == undefined){
            return;
        }
        if (this.pusherInitialized == true){
            return;
        }
        this.pusherInitialized = true;
        var channelName = 'user_data_' + this.props.currentUser.id;
        var eventsNames = this.props.eventsNames;
        for (var i in eventsNames){
            var ev = eventsNames[i];
            PusherHelper.bindEvent(channelName, ev, this.props.onMessageReceived);
        }
    }

    componentDidMount = () => {
        this.initPusher();
    }

    componentWillReceiveProps() {
        this.initPusher();
    }

    componentWillUnmount = () => {

    }

    render() {

        return (
            <div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMessageReceived: (data) => {
            dispatch(actions.onPusherMessageReceived(data))
        }
    }
}

PusherComponent = connect(mapStateToProps, mapDispatchToProps)(PusherComponent)

export default PusherComponent