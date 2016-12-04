/**
 * Created by sabir on 04.12.16.
 */


import React, {PropTypes} from 'react';

import SimpleTemplate from '../templates/SimpleUserTemplate.js';

import { connect } from 'react-redux';

import HRMDeviceEmulator from '../emulators/HRMDeviceEmulator.js';

class EmulatorApp extends React.Component {

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

                <HRMDeviceEmulator />

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


EmulatorApp = connect(mapStateToProps, null)(EmulatorApp)

export default EmulatorApp