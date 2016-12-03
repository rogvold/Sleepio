/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {LineChart, Line, ResponsiveContainer} from 'recharts';

import moment from 'moment';

import SessionChartPanel from '../charts/SessionChartPanel.js'

class ListItem extends React.Component {

    static defaultProps = {

    }

    static propTypes = {
        session: PropTypes.object.isRequired,
        onItemClick: PropTypes.func,
        expanded: PropTypes.bool
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

    onClick = () => {
        this.props.onItemClick();
    }

    render() {
        var session = this.props.session;
        var calcData = session.calcData;
        var expanded = this.props.expanded;


        return (
            <div className={'item session_item' + (expanded == true ? ' expanded ' : '')} onClick={this.onClick} >
                <div className={'header'} >
                    {moment(session.startTimestamp).format('LLL')}
                </div>
                <div className={'content'} >

                    {calcData == undefined ? null :
                        <div className={'calc_data'} >
                            {calcData.HEART_RATE == undefined ? null :
                                <div className={'info_line'} >
                                    <div className={'column mini'} >
                                        <img src={'assets/images/sleep_heartrate.png'} />
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            AVR
                                        </div>
                                        <div className={'value'} >
                                            {Math.round(calcData.HEART_RATE.avr)}
                                        </div>
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            MIN
                                        </div>
                                        <div className={'value'} >
                                            {Math.round(calcData.HEART_RATE.min)}
                                        </div>
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            MAX
                                        </div>
                                        <div className={'value'} >
                                            {Math.round(calcData.HEART_RATE.max)}
                                        </div>
                                    </div>
                                    <div className={'column max chart_placeholder'} >
                                        <LineChart  width={260} height={35}
                                                   data={calcData.HEART_RATE.points.map(p => ({name: 'breathing', uv: p.value}))}>
                                            <Line type="monotone" dot={false} isAnimationActive={false}
                                                  dataKey="uv" strokeWidth={2} stroke="#DE90BB" />
                                        </LineChart>
                                    </div>
                                </div>
                            }

                            {calcData.BREATHING == undefined ? null :
                                <div className={'info_line'} >
                                    <div className={'column mini'} >
                                        <img src={'assets/images/sleep_breathing.png'} />
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            AVR
                                        </div>
                                        <div className={'value '} >
                                            {Math.round(calcData.BREATHING.avr)}
                                        </div>
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            MIN
                                        </div>
                                        <div className={'value'} >
                                            {Math.round(calcData.BREATHING.min)}
                                        </div>
                                    </div>
                                    <div className={'column mini'} >
                                        <div className={'head'} >
                                            MAX
                                        </div>
                                        <div className={'value'} >
                                            {Math.round(calcData.BREATHING.max)}
                                        </div>
                                    </div>
                                    <div className={'column max chart_placeholder'} >
                                        <LineChart  width={260} height={35}
                                                   data={calcData.BREATHING.points.map(p => ({name: 'breathing', uv: p.value}))}>
                                            <Line type="monotone" dot={false} isAnimationActive={false}
                                                  dataKey="uv" strokeWidth={2} stroke="#DE90BB" />
                                        </LineChart>
                                    </div>
                                </div>
                            }

                            {this.props.expanded != true ? null :
                                <div className={'extended_content'} >
                                    <SessionChartPanel sessionId={session.id} />
                                </div>
                            }

                        </div>
                    }



                </div>
            </div>
        )
    }

}

export default ListItem