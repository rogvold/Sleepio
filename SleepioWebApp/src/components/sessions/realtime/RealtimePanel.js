/**
 * Created by sabir on 04.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChartPanel from '../charts/ChartPanel.js'

import MathHelper from '../../../helpers/MathHelper.js'

class RealtimePanel extends React.Component {

    static defaultProps = {
        timePeriod: 4 * 60 * 1000
    }

    static propTypes = {
        channelsMap: PropTypes.object.isRequired
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getMessages = () => {
        var map = this.props.channelsMap;
        var arr = [];
        for (var key in map){
            var messages = map[key];
            if (messages == undefined || messages.length == 0){
                continue;
            }
            arr = arr.concat(messages);
        }
        return arr;
    }

    getPlotData = () => {
        let messages = this.getMessages();

        let heartRatePoints = [];
        let breathingPoints = [];
        for (var i in messages){
            var m = messages[i];
            heartRatePoints = heartRatePoints.concat(m.heartRatePoints)
            breathingPoints = breathingPoints.concat(m.breathingPoints)
        }

        return MathHelper.getPlotData(heartRatePoints, breathingPoints, +new Date() - this.props.timePeriod);
    }

    getLastHeartRate = (plotData) => {
        if (plotData == undefined || plotData.length == 0){
            return undefined;
        }
        for (var i = plotData.length - 1; i >=0; i--){
            var d = plotData[i];
            if (d.hr != undefined){
                return d.hr;
            }
        }
        return undefined;
    }

    getLastBreathingRate = (plotData) => {
        if (plotData == undefined || plotData.length == 0){
            return undefined;
        }
        for (var i = plotData.length - 1; i >=0; i--){
            var d = plotData[i];
            if (d.breathing != undefined){
                return d.breathing;
            }
        }
        return undefined;
    }

    render() {
        let plotData = this.getPlotData();

        let hr = this.getLastHeartRate(plotData);
        let breathing = this.getLastBreathingRate(plotData);
        if (plotData == undefined || plotData.length == 0){
            return null;
        }

        return (
            <div className={'realtime_panel'} >

                <div className={'realtime_info_panel'} >

                    <div className={'line'} >

                        <img src={'assets/images/sleep_heartrate.png'} />

                        <div className={'info'} >
                            {hr}
                        </div>
                    </div>

                    <div className={'line'} >

                        <img src={'assets/images/sleep_breathing.png'} />

                        <div className={'info'} >
                            {breathing}
                        </div>
                    </div>

                </div>

                <div className={'realtime_chart_panel'} >
                    <ChartPanel plotData={plotData} isAnimationActive={false} />
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        channelsMap: state.pusher.channelsMap
    }
}


RealtimePanel = connect(mapStateToProps, null)(RealtimePanel)

export default RealtimePanel