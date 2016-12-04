/**
 * Created by sabir on 05.09.16.
 */

import * as constants from '../constants/AccountsConstants.js'

var APIFactory = {

    self: this,

    BASE: 'http://api.parse.com/1/functions/',

    DEFAULT_HEADERS: [{
        name: 'X-Parse-Application-Id',
        value: constants.PARSE_APP_ID
    }, {
        name: 'X-Parse-REST-API-Key',
        value: constants.PARSE_REST_API_KEY
    },
        {
            name: 'Content-Type',
            value: 'application/json'
        }
    ],

    SIGN_IN: {
        name: 'login',
        description: 'login',
        requestType: 'GET',
        headers: [],
        parameters: [{
            name: 'email',
            description: 'email of user',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'password',
                description: 'password of user',
                isRequired: true,
                paramType: 'string'
            }
        ]
    },

    //[{"t":120,"value":4},{"t":333,"value":123}]
    UPLOAD_DATA: {
        name: 'uploadData',
        description: 'upload data',
        requestType: 'GET',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [
            {
                name: 'startTimestamp',
                isRequired: true,
                paramType: 'number',
                description: 'UNIX timestamp of start (in milliseconds)'
            },
            {
                name: 'breathingPoints',
                isRequired: true,
                paramType: 'array',
                description: 'массив точек дыхания. Пример: [{"t": 0, "value": 20}, {"t": 1200, "value": 23}, ...] , где value - частота дыхания, t - время в миллисекундах от начала записи'
            },
            {
                name: 'heartRatePoints',
                isRequired: true,
                paramType: 'array',
                description: 'Массив точек пульса. Пример: [{"t": 0, "value": 63}, {"t": 1103, "value": 65}, ...] , где value - пульс, t - время в миллисекундах от начала записи'
            }
        ]
    },

    UPLOAD_REALTIME_DATA: {
        name: 'uploadRealtimeData',
        description: 'send realtime data',
        requestType: 'GET',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [
            {
                name: 'breathingPoints',
                isRequired: true,
                paramType: 'array',
                description: 'Массив точек дыхания. Пример: [{"t": 1480852922665, "value": 20}, {"t": 1480852923665, "value": 23}, ...] , где value - частота дыхания, t - таймстемп точки (в миллисекундах)'
            },
            {
                name: 'heartRatePoints',
                isRequired: true,
                paramType: 'array',
                description: 'Массив точек пульса. Пример: [{"t": 1480852922665, "value": 63}, {"t": 1480852923665, "value": 65}, ...] , где value - пульс, t - таймстемп точки (в миллисекундах)'
            }
        ]
    }



};

module.exports = APIFactory;