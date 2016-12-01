/**
 * Created by sabir on 01.12.16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/UsersActions.js';

import LogoutWrapper from '../auth/buttons/LogoutWrapper.js';

import * as constants from '../../constants/AccountsConstants.js'

class SimpleUserTemplate extends React.Component {

    static defaultProps = {
        logo: constants.LOGO_URL,
        companyName: constants.COMPANY_NAME,

        showCloseButton: true

    }

    static propTypes = {
        loading: PropTypes.bool,
        currentUser: PropTypes.object,
        companyName: PropTypes.string,

        content: PropTypes.element
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render() {
        let user = this.props.currentUser;
        let isEmptyName = (user.firstName == undefined && user.lastName == undefined);

        return (
            <div className={'simple_user_template'} >

                <div className={'header'} >

                    <div className={'header_inner'} >
                        <div className={'logo_placeholder'} >
                            <div className={'logo_img_placeholder'} >
                                <img src={this.props.logo} className={'logo'} />
                            </div>
                            <div className={'company_name'} >{this.props.companyName}</div>
                        </div>

                        <div className={'right_placeholder'} >

                            {this.props.showCloseButton == false ? null :
                                <div className={'logout_placeholder'} >
                                    <LogoutWrapper >
                                        <div className={'logout'} >
                                            <i className={'icon log out'} ></i>
                                            log out
                                        </div>
                                    </LogoutWrapper>
                                </div>
                            }

                            <div className={'current_user_placeholder'} >
                                <div className={'name_placeholder'} >
                                    {isEmptyName == true ?
                                        <span><i className={'icon user'} ></i> {user.email}</span> :
                                        <span> {user.firstName} {user.lastName}</span>
                                    }
                                </div>
                                <div className={'avatar_placeholder'} >
                                    <img src={user.avatar} className={'avatar'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className={'content'} >
                    {this.props.content}
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        loading: state.users.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actions.logOut())
        }
    }
}

SimpleUserTemplate = connect(mapStateToProps, mapDispatchToProps)(SimpleUserTemplate)

export default SimpleUserTemplate