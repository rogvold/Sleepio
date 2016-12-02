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


    SIGN_UP: {
        name: 'signup',
        description: 'sign up',
        requestType: 'POST',
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

    CREATE_TASK: {
        name: 'createTask',
        description: 'create task',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'name',
            description: 'name of task',
            isRequired: true,
            paramType: 'string'
        },
            {
                name: 'description',
                description: 'description of task',
                isRequired: false,
                paramType: 'string'
            }
        ]
    },

    UPDATE_TASK: {
        name: 'updateTask',
        description: 'update existing task',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            description: 'id of the task you want to update',
            isRequired: true,
            paramType: 'string'
            },
            {
                name: 'name',
                description: 'new name of task',
                isRequired: false,
                paramType: 'string'
            },
            {
                name: 'description',
                description: 'new description of task',
                isRequired: false,
                paramType: 'string'
            }
        ]
    },

    DELETE_TASK: {
        name: 'deleteTask',
        description: 'delete existing task',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            description: 'id of the task you want to delete',
            isRequired: true,
            paramType: 'string'
        }
        ]
    },

    LOAD_USER_TASKS: {
        name: 'getTasks',
        description: 'returns list of user tasks',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: []
    },

    CREATE_INTERVAL: {
        name: 'createInterval',
        description: 'creates interval of the task',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'taskId',
            isRequired: true,
            paramType: 'string',
            description: 'id of the task'
        }, {
            name: 'start',
            isRequired: true,
            paramType: 'number',
            description: 'UNIX timestamp of start (in milliseconds)'
        }, {
            name: 'duration',
            isRequired: true,
            paramType: 'number',
            description: 'duration of the interval (in milliseconds)'
        }]
    },

    UPDATE_INTERVAL: {
        name: 'updateInterval',
        description: 'updates existing interval',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            isRequired: true,
            paramType: 'string',
            description: 'id of the interval'
        }, {
            name: 'start',
            isRequired: false,
            paramType: 'number',
            description: 'new UNIX timestamp of start (in milliseconds)'
        }, {
            name: 'duration',
            isRequired: false,
            paramType: 'number',
            description: 'new duration of the interval (in milliseconds)'
        }]
    },

    DELETE_INTERVAL: {
        name: 'deleteInterval',
        description: 'deletes existing interval',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'id',
            isRequired: true,
            paramType: 'string',
            description: 'id of the interval'
        }]
    },

    LOAD_TASK_INTERVALS: {
        name: 'getIntervals',
        description: 'returns list of task intervals ordered by start',
        requestType: 'POST',
        headers: [{name: 'X-Parse-Session-Token'}],
        parameters: [{
            name: 'taskId',
            isRequired: true,
            paramType: 'string',
            description: 'task id'
        }]
    }

};

module.exports = APIFactory;