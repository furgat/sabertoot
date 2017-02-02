import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';

//TODO: future version, probably create or implement modular form component
export default class AddAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_code: '',
      auth_input: '',
      submit_auth: 'disabled'
    }
  }

  validateAuth(event) {
    const {AUTH_CODE} = regexRef();
    const testAuth = regexTest(AUTH_CODE, event.target.value);
    this.setState({
      auth_code: (testAuth ? event.target.value : ''),
      auth_input: (testAuth ? 'valid' : 'invalid'),
      submit_auth: (testAuth ? '' : 'disabled')
    });
  }

  render() {
    const {auth_input, submit_auth} = this.state;
    const authCodeClass = 'auth-code ' + auth_input;
    const submitAuthClass = 'submit-auth ' + submit_auth;
    
    return (
      <div className="add-account">
        <form className="auth-form">
          <label className="auth-code-label">Authorization Code:</label>
          <input type="text" className={authCodeClass} onChange={this.validateAuth.bind(this)}/>
          <button type="button" className={submitAuthClass}>VALIDATE</button>
        </form>
      </div>
    );
  }
}
