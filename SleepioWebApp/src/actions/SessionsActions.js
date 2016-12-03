/**
 * Created by sabir on 02.12.16.
 */

import * as types from '../constants/ActionTypes.js'
import ParseAPI from '../api/ParseAPI.js';

//SESSIONS
let loadUserSessions_ = (userId) => {
    return {
        type: types.LOAD_USER_SESSIONS,
        userId: userId
    }
}
let loadUserSessionsSuccess = (userId, data) => {
    return {
        type: types.LOAD_USER_SESSIONS_SUCCESS,
        sessions: data.sessions
    }
}
let loadUserSessionsFail = (userId, error) => {
    return {
        type: types.LOAD_USER_SESSIONS_FAIL,
        userId: userId,
        error: error
    }
}
//thunk
export function loadUserSessions(userId){
    return (dispatch, getState) => {
        dispatch(loadUserSessions_());
        return ParseAPI.runCloudFunctionAsPromise('loadUserSessions', {userId: userId}).then(
            data => dispatch(loadUserSessionsSuccess(userId, data)),
            error => dispatch(loadUserSessionsFail(userId, error))
        )
    }
}

//DATA
let loadSessionData_ = (sessionId) => {
    return {
        type: types.LOAD_SESSION_DATA,
        sessionId: sessionId
    }
}
let loadSessionDataSuccess = (sessionId, data) => {
    return {
        type: types.LOAD_SESSION_DATA_SUCCESS,
        data: data,
        sessionId: sessionId
    }
}
let loadSessionDataFail = (sessionId, error) => {
    return {
        type: types.LOAD_SESSION_DATA_FAIL,
        sessionId: sessionId,
        error: error
    }
}
//thunk
export function loadSessionData(sessionId){
    return (dispatch, getState) => {
        var data = getState().sessions.sessionsDataMap[sessionId];
        if (data != undefined){
            return Promise.resolve();
        }
        dispatch(loadSessionData_());
        return ParseAPI.runCloudFunctionAsPromise('loadSessionData', {sessionId: sessionId}).then(
                data => dispatch(loadSessionDataSuccess(sessionId, data)),
                error => dispatch(loadSessionDataFail(sessionId, error))
        )
    }
}