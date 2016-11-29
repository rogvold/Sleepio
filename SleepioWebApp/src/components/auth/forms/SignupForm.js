/**
 * Created by sabir on 29.11.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CommonHelper from '../../../helpers/CommonHelper.js';

class SignupForm extends React.Component {

    static defaultProps = {
        onSubmit (data){
            console.log('default onSubmit occured: data = ', data);
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func
    }

    state = {
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getData = () => {
        return {
            email: this.state.email,
            password: this.state.password
        }
    }

    canSubmit = () => {
        var email = this.state.email;
        if (CommonHelper.isValidEmail(email) == false){
            return false;
        }
        var {password, passwordConfirmation} = this.state;
        if (password == undefined || password.trim() == '' || password != passwordConfirmation){
            return false;
        }
        return true;
    }

    onSubmit = () => {
        this.props.onSubmit(this.getData());
    }

    render() {
        let canSubmit = this.canSubmit();

        return (
            <div className={'signup_form ui form'} >



                <div className={'field'} >
                    <label>Email</label>
                    <input value={this.state.email} placeholder={'Email'}
                            onChange={(e) => {this.setState({email: e.target.value})}}
                        />
                </div>

                <div className={'field'} >
                    <label>Password</label>
                    <input value={this.state.password} placeholder={'Password'} type={'password'}
                           onChange={(e) => {this.setState({password: e.target.value})}}
                        />
                </div>

                <div className={'field'} >
                    <label>Confirm password</label>
                    <input value={this.state.passwordConfirmation} placeholder={'Confirm password'} type={'password'}
                           onChange={(e) => {this.setState({passwordConfirmation: e.target.value})}}
                        />
                </div>

                <div className={'submit_button_placeholder'} >
                    <button className={'ui button fluid'} onClick={this.onSubmit} disabled={!canSubmit} >
                        SignUp
                    </button>
                </div>

            </div>
        )
    }

}

export default SignupForm