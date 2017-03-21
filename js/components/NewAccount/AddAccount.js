import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';
import MastoStore from '../../stores/MastoStore';

//TODO: future version, probably create or implement modular form component
export default class AddAccount extends React.Component {
  constructor() {
    super();
    var OAuth2 = require('oauth').OAuth2;

    const {name, domain_name} = MastoStore.getAccountWithFlag('PROG');
    const {api_url, client_id, client_secret} = MastoStore.getDomainWithName(domain_name);
    const domain_url = new URL(api_url);

    var oauth = new OAuth2(
      client_id,
      client_secret,
      domain_url.protocol + '//' + domain_url.hostname,
      null, '/oauth/token');

    var oauth_url = oauth.getAuthorizeUrl({
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
      response_type: 'code',
      scope: 'read write follow'
    });

    this.state = {
      auth_code: '',
      auth_input: '',
      submit_auth: 'disabled',
      account_hold: {
        name, domain_name
      }
    }

    window.open(oauth_url, '_blank');
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

  getAccessKey() {
    const {auth_code} = this.state;

    oauth.getOAuthAccessToken(
      auth_code,
      {
        grant_type: 'authorization_code',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
      },
      function(err, accessToken, refreshToken, res) {
        console.log(accessToken);
      }
    );
  }

  render() {
    const {auth_input, submit_auth} = this.state;
    const authCodeClass = 'auth-code form-control' + auth_input;
    const submitAuthClass = 'submit-auth btn btn-primary' + submit_auth;

    return (
      <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 add-account">
        <h1>New Account</h1>
        <form className="auth-form">
          <div className="form-group">
            <label className="auth-code-label">Authorization Code:</label>
            <input type="text" className={authCodeClass} onChange={this.validateAuth.bind(this)}/>
          </div>
          <button type="button" className={submitAuthClass} onClick={this.getAccessKey.bind(this)}>VALIDATE</button>
        </form>
      </div>
    );
  }
}
