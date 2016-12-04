/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/SessionsActions.js';

import moment from 'moment';

import CoolPreloader from '../../preloader/CoolPreloader.js'

import MathHelper from '../../../helpers/MathHelper.js';

import ChartPanel from '../charts/ChartPanel.js';

class SessionPanel extends React.Component {

    static defaultProps = {
        downsamplingNumber: 200
    }

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

    getPlotData = () => {
        var arr = [];
        var session = this.props.sessionsMap[this.props.sessionId];
        var d = this.props.sessionsDataMap[this.props.sessionId];
        if (d == undefined || session == undefined){
            return [];
        }
        var breathingList = d.BREATHING;
        var heartRateList = d.HEART_RATE;
        var map = {};

        if (heartRateList != undefined && heartRateList.length > 0 ){
            heartRateList = MathHelper.makePointsDownsampling(heartRateList, this.props.downsamplingNumber);
            for (var i in heartRateList){
                var hrD = heartRateList[i];
                var t = hrD.t;
                var key = t + '';
                if (map[key] == undefined){
                    map[key] = {};
                }
                map[key].t = t;
                map[key].hr = hrD.value;
            }
        }

        if (breathingList != undefined && breathingList.length > 0 ){
            breathingList = MathHelper.makePointsDownsampling(breathingList, this.props.downsamplingNumber);
            for (var i in breathingList){
                var bD = breathingList[i];
                var t = bD.t;
                var key = t + '';
                if (map[key] == undefined){
                    map[key] = {};
                }
                map[key].t = t;
                map[key].breathing = bD.value;
            }
        }

        for (var key in map){
            var d = map[key];
            arr.push({t: d.t + session.startTimestamp, breathing: d.breathing, hr: d.hr});
        }
        arr.sort(function(a, b){
            return (a.t - b.t)
        });

        return arr;
    }

    render() {
        var session = this.props.sessionsMap[this.props.sessionId];
        let plotData = this.getPlotData();


        return (
            <div className={'session_panel'} >

                <div className={'header'} >
                    {moment(session.startTimestamp).format('LLL')}
                </div>

                <div className={'content'} >
                    <ChartPanel plotData={plotData} />
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