import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            showPassword: false,
        };
    };

    handleOnChangeInput = (e) => {
        if (e.target.name === "username") 
        {
            this.setState({
                username: e.target.value
            });
        }
        else if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            });
        }
        else {
            console.log("Error!");
        };
    };

    handleLogin = () => {
        
    };

    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    render() {
        return (
            <div className='login-background'>
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name='username' 
                                placeholder='Enter username'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.showPassword ? "text" : "password"} 
                                    className="form-control" 
                                    name='password' 
                                    placeholder='Enter password'
                                    onChange={(e) => this.handleOnChangeInput(e)}
                                />
                                <span onClick={() => {this.handleShowPassword()}}>
                                    {
                                        this.state.showPassword ? 
                                        (<i class="far fa-eye"></i>) 
                                        : 
                                        (<i class="far fa-eye-slash"></i>)
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="col-12 my-3">
                            <button onClick={() => {this.handleLogin()}} className='btn btn-primary w-100'>Login</button>
                        </div>
                        <div className="col-12">
                            <span>Forgot password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-other-login">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
