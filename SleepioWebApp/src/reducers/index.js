/**
 * Created by sabir on 28.11.16.
 */

import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import SessionsReducer from './SessionsReducer.js';
import PusherReducer from './PusherReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    sessions: SessionsReducer,
    pusher: PusherReducer
});