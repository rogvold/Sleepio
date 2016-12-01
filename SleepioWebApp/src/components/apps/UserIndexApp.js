/**
 * Created by sabir on 28.11.16.
 */

import React, {PropTypes} from 'react';

import SimpleTemplate from '../templates/SimpleUserTemplate.js';

import Dialog from '../dialog/Dialog.js';

class UserIndexApp extends React.Component {

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {

    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    getContent = () => {
        return (
            <div className={'user_index_app_content'} >



            </div>
        )
    }

    render(){

        return (
            <SimpleTemplate content={this.getContent()} />
        )
    }

}

export default UserIndexApp