/**
 * Created by sabir on 04.12.16.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    channelsMap: {}
}



const PusherReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.PUSHER_MESSAGE_RECEIVED:
            var data = action.data;
            var channelName = data.channelName;
            var channelsMap = Object.assign({}, state.channelsMap);
            if (channelsMap[channelName] == undefined){
                channelsMap[channelName] = [];
            }
            data.t = +new Date();
            channelsMap[channelName].push(data.message);
            return {...state, channelsMap: channelsMap}


        default:
            return state;
    }

}

export default PusherReducer