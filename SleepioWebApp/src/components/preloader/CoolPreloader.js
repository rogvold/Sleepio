/**
 * Created by sabir on 29.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CoolPreloader extends React.Component {

    static defaultProps = {
        text: 'Loading...'
    }

    static propTypes = {
        text: PropTypes.string
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

        return (
            <div className={'ui inverted dimmer active' }>
                {this.props.text == undefined ? null :
                    <div className="ui indeterminate text loader">{this.props.text}</div>
                }
            </div>
        )
    }

}

export default CoolPreloader