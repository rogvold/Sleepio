/**
 * Created by sabir on 28.11.16.
 */
import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

import { Router, Route, browserHistory, useRouterHistory, hashHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

//api
import ParseAPI from './api/ParseAPI.js';

//apps
import UserIndexApp from './components/apps/UserIndexApp.js';
import DevApp from './components/apps/DevApp.js';
import LoginApp from './components/apps/LoginApp.js';

import {reducer} from './reducers'

const loggerMiddleware = createLogger()


const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ParseAPI.initParse();

class App extends React.Component{

    getUserRoute() {

        console.log('getUserRoute occured');

        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/dev" component={DevApp}/>

                <Route path="/login" component={LoginApp}/>

            </Router>
        );
    }

    render() {
        console.log('rendering app');
        return (
            <Provider store={store}>
                {this.getUserRoute()}
            </Provider>
        );
    }

}

ReactDOM.render(
<App />,
    document.querySelector('#main')
);