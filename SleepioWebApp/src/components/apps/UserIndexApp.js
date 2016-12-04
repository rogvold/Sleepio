/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import SimpleTemplate from '../templates/SimpleUserTemplate.js';

import { connect } from 'react-redux';

import Dialog from '../dialog/Dialog.js';

import SessionsListPanel from '../sessions/panels/SessionsListPanel.js'

import PusherComponent from '../pusher/PusherComponent.js'
import PusherMessagesWrapper from '../pusher/PusherMessagesWrapper.js'

import HRMDeviceEmulator from '../emulators/HRMDeviceEmulator.js';

import RealtimePanel from '../sessions/realtime/RealtimePanel.js'

class UserIndexApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        currentUser: PropTypes.object.isRequired
    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        var user = this.props.currentUser;

        return (
            <div className={'user_index_app_content'} >

                <PusherComponent />

                <RealtimePanel />

                <SessionsListPanel userId={user.id} />



            </div>
        )
    }

    render(){

        return (
            <SimpleTemplate content={this.getContent()} />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}


UserIndexApp = connect(mapStateToProps, null)(UserIndexApp)

export default UserIndexApp