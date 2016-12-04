/**
 * Created by sabir on 04.12.16.
 */

import * as types from '../constants/ActionTypes.js'

export function onPusherMessageReceived(data){
    return {
        type: types.PUSHER_MESSAGE_RECEIVED,
        data: data
    }
}