/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

class ListItem extends React.Component {

    static defaultProps = {
        timestamp: 0
    }

    static propTypes = {
        timestamp: PropTypes.number,
        onItemClick: PropTypes.func
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

        return (
            <div className={'item session_item'} onClick={this.onClick} >
                <div className={'header'} >
                    {moment(this.props.timestamp).format('LLLL')}
                </div>
                <div className={'content'} >

                </div>
            </div>
        )
    }

}

export default ListItem