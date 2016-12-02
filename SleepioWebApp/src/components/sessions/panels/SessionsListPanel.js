/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';

import SessionsList from '../list/SessionsList.js'

import CoolPreloader from '../../preloader/CoolPreloader.js'

class SessionsListPanel extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        userId: PropTypes.string.isRequired,
        usersMap: PropTypes.object.isRequired,
        sessionsMap: PropTypes.object.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUserSessions(this.props.userId);
    }

    componentWillReceiveProps() {

    }

    getSessions = () => {
        var userId = this.props.userId;
        var map = this.props.sessionsMap;
        var arr = [];
        for (var key in map){
            var session = map[key];
            if (session == undefined){
                continue;
            }
            if (session.userId == userId){
                arr.push(session);
            }
        }
        arr.sort(function(a, b){
            return (b.startTimestamp - a.startTimestamp)
        });
        return arr;
    }

    render() {
        var user = this.props.usersMap[this.props.userId];
        var sessions = this.getSessions();

        return (
            <div className={'sessions_list_panel'} >

                <div className={'list_placeholder'} >
                    <SessionsList sessions={sessions} />
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
        usersMap: state.users.usersMap,
        sessionsMap: state.sessions.sessionsMap,
        loading: state.sessions.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserSessions: (userId) => {
            dispatch(actions.loadUserSessions(userId))
        }
    }
}

SessionsListPanel = connect(mapStateToProps, mapDispatchToProps)(SessionsListPanel)

export default SessionsListPanel