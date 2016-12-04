/**
 * Created by sabir on 04.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PusherMessagesWrapper extends React.Component {

    static defaultProps = {}

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
            arr = arr.concat(messages);
        }
        arr.reverse();
        return arr;
    }

    render() {
        var messages = this.getMessages();

        return (
            <div>

                {messages.map((item, k) => {
                    var key = 'key_' + k + '_' + JSON.stringify(item);
                    return (
                        <div key={key} style={{marginBottom: 20}} >
                            {JSON.stringify(item)}
                        </div>
                    )
                })}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        channelsMap: state.pusher.channelsMap
    }
}


PusherMessagesWrapper = connect(mapStateToProps, null)(PusherMessagesWrapper)

export default PusherMessagesWrapper