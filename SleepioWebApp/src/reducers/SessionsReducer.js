/**
 * Created by sabir on 02.12.16.
 */

import * as types from '../constants/ActionTypes.js'

const initialState = {
    loading: false,
    sessionsMap: {},
    sessionsDataMap: {},
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeSessions = (state, sessions) => {
    if (sessions == undefined){
        return state;
    }
    var sessionsMap = Object.assign({}, state.sessionsMap);
    for (let s of sessions){
        sessionsMap[s.id] = s;
    }
    return Object.assign({}, state.sessionsMap, sessionsMap);
}


const SessionsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_USER_SESSIONS:
            return startLoading(state, action)

        case types.LOAD_USER_SESSIONS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USER_SESSIONS_SUCCESS:
            let sessions = action.sessions;
            let userId = action.userId;
            let newSessionsMap = consumeSessions(state, sessions);
            return {...state, loading: false, error: undefined, sessionsMap: newSessionsMap}


        case types.LOAD_SESSION_DATA:
            return startLoading(state, action)

        case types.LOAD_SESSION_DATA_FAIL:
            return stopLoading(state, action)

        case types.LOAD_SESSION_DATA_SUCCESS:
            let data = action.data;
            let sessionId = action.sessionId;
            let newSessionsDataMap = Object.assign({}, state.sessionsDataMap);
            newSessionsDataMap[sessionId] = data;
            return {...state, loading: false, error: undefined, sessionsDataMap: newSessionsDataMap}


        default:
            return state;
    }

}

export default SessionsReducer