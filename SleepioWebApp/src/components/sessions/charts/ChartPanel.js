/**
 * Created by sabir on 03.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import {LineChart, AreaChart, Line, ResponsiveContainer,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const dateFormat = (time) => {
    var s = moment(+time).format('HH:mm');
    return s;
};

class ChartPanel extends React.Component {

    static defaultProps = {
        isAnimationActive: true
    }

    static propTypes = {
        plotData: PropTypes.array
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

    render() {
        var plotData = this.props.plotData;
        if (plotData == undefined){
            plotData = [];
        }

        return (
            <div className={'chart_placeholder'} >
                <ResponsiveContainer>
                    <LineChart data={plotData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} >

                        <Line type="monotone" dot={false} yAxisId={'left'} isAnimationActive={this.props.isAnimationActive}
                              connectNulls={false}
                              dataKey="hr" strokeWidth={2} stroke="#DE90BB" />

                        <Line type="monotone" dot={false} yAxisId={'right'}
                              connectNulls={false}
                              isAnimationActive={this.props.isAnimationActive}
                              dataKey="breathing" strokeWidth={2} stroke="#82ca9d" />

                        <XAxis dataKey="t"  tickFormatter={dateFormat} tickCount={5} minTickGap={10}  />

                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip labelFormatter={dateFormat} />
                        <Legend  />

                        <YAxis yAxisId="left" orientation="left" stroke="#DE90BB"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}


export default ChartPanel