/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';

import moment from 'moment';

import CoolPreloader from '../../preloader/CoolPreloader.js'

class SessionPanel extends React.Component {

    static defaultProps = {}

    static propTypes = {
        sessionId: PropTypes.string.isRequired,
        sessionsMap: PropTypes.object.isRequired,
        sessionsDataMap: PropTypes.object.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSessionData(this.props.sessionId);
    }

    componentWillReceiveProps() {

    }

    render() {
        var session = this.props.sessionsMap[this.props.sessionId];


        return (
            <div className={'session_panel'} >

                <div className={'header'} >
                    {moment(session.startTimestamp).format('LLLL')}
                </div>

                <div className={'content'} >
                    todo: make chart
                </div>

                {this.props.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        sessionsMap: state.sessions.sessionsMap,
        sessionsDataMap: state.sessions.sessionsDataMap,
        loading: state.sessions.loading,
        error: state.sessions.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessionData: (sessionId) => {
            dispatch(actions.loadSessionData(sessionId))
        }
    }
}

SessionPanel = connect(mapStateToProps, mapDispatchToProps)(SessionPanel)

export default SessionPanel