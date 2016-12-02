/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListItem from './ListItem.js'

class SessionsList extends React.Component {

    static defaultProps = {
        sessions: []
    }

    static propTypes = {
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

    onItemClick = (item) => {
        this.props.onItemClick(item);
    }

    render() {
        let list = this.props.sessions;

        return (
            <div className={'sessions_list'} >
                {list.map((item, k) => {
                    var key = 'session_item_' + k;
                    var onItemClick = this.onItemClick.bind(this, item);
                    return (
                        <ListItem key={key} onItemClick={onItemClick} />
                    );
                }, this)}
            </div>
        )
    }

}

export default SessionsList