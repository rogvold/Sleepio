/**
 * Created by sabir on 02.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListItem from './ListItem.js'

import FlipMove from 'react-flip-move';

class SessionsList extends React.Component {

    static defaultProps = {
        sessions: []
    }

    static propTypes = {
        onItemClick: PropTypes.func,
        selectedSessionId: PropTypes.string
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
                <FlipMove easing="cubic-bezier(0.39, 0, 0.45, 1.4)" staggerDurationBy={60} duration={300} >
                    {list.map((item, k) => {
                        var key = 'session_item_' + k + '_' + item.id;
                        var onItemClick = this.onItemClick.bind(this, item);
                        var isSelected = (item.id == this.props.selectedSessionId);
                        return (
                            <ListItem expanded={isSelected} session={item} key={key} onItemClick={onItemClick} />
                        );
                    }, this)}
                </FlipMove>
            </div>
        )
    }

}

export default SessionsList