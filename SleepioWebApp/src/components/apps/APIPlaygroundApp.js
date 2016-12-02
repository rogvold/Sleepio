/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as constants from '../../constants/AccountsConstants.js';

import PlaygroundPanel from '../api_playground/PlaygroundPanel.js';

import BackgroundImageContainer from '../image/BackgroundImageContainer.js';

class APIPlaygroundApp extends React.Component {

    static defaultProps = {}

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    componentStyle = {
        topAdPlaceholder: {
            height: 280,
            width: '100%',
            position: 'relative'
        }
    }

    render() {

        return (
            <div style={{paddingTop: 0}} >

                <div style={this.componentStyle.topAdPlaceholder}>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1}}>
                        <BackgroundImageContainer image={'http://app.cardiomood.com/assets/images/api_background.png'} />
                    </div>

                    <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 2, background: 'rgba(0, 0, 0, 0.1)'}}>
                        <div style={{paddingTop: 100, lineHeight: '80px', fontSize: 64, color: 'white', textAlign: 'center'}} >
                            {constants.COMPANY_NAME} API Playground
                        </div>
                    </div>

                </div>

                <PlaygroundPanel />


            </div>
        )
    }

}


export default APIPlaygroundApp