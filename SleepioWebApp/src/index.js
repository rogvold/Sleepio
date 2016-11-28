/**
 * Created by sabir on 28.11.16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import {Provider} from 'react-redux';

class App extends React.Component{

    render() {
        return (
            <div>

                Hello!

            </div>
    );
    }

}

ReactDOM.render(
<App />,
    document.querySelector('#main')
);