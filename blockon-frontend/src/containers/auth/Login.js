import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';

import AuthContent from 'components/auth/AuthContent';
import AuthButton from 'components/auth/AuthButton';
import AuthLink from 'components/auth/AuthLink';

import * as AuthAPI from 'lib/api/auth';
import * as CaverUtils from 'lib/caver/utils';

import { Divider, message } from 'antd';

class Login extends Component {
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = async () => {
    const { history } = this.props; // 나중에 없앨 것!
    const { setLoggedInfo } = this.props;
    const defaultAccount = CaverUtils.getDefaultAccount();

    AuthAPI.login(defaultAccount)
      .then(res => {
        const loggedInfo = res.data;
        setLoggedInfo(loggedInfo);

        localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
        history.push('/pricing'); // 나중에 없앨 것!
      })
      .catch(() => {
        message.warning('가입되지 않은 사용자입니다.');
      });
  };

  handleRegister = () => {
    const { history } = this.props;
    history.push('/auth/register');
  };

  render() {
    return (
      <AuthContent title="로그인">
        <AuthButton onClick={this.handleLogin}>MetaMask로 로그인</AuthButton>
        <Divider />
        <AuthLink handleClick={this.handleRegister}>회원가입</AuthLink>
      </AuthContent>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedInfo: loggedInfo => dispatch(userActions.setLoggedInfo(loggedInfo))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
