import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';

//TODO: future version, probably create or implement modular form component
export default class AddAccount extends React.Component {
  constructor() {
    super();
    var OAuth2 = require('oauth').OAuth2;

    var oauth = new OAuth2(
      'your_client_id',
      'your_client_secret',
      'https://mastodon.social',
      null, '/oauth/token');

    var url = oauth.getAuthorizeUrl({
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
      response_type: 'code',
      scope: 'read write follow'
    });

    this.state = {
      auth_code: '',
      auth_input: '',
      submit_auth: 'disabled',
      oauth_url: url
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

  getAccessKey() {
    oauth.getOAuthAccessToken(
      'code from the authorization page that user should paste into your app',
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
    const {auth_input, submit_auth, oauth_url} = this.state;
    const {params} = this.props;
    const authCodeClass = 'auth-code ' + auth_input;
    const submitAuthClass = 'submit-auth ' + submit_auth;

    return (
      <div className="add-account">
        <form className="auth-form">
          <span>
            {oauth_url}
          </span>
          <label className="auth-code-label">Authorization Code:</label>
          <input type="text" className={authCodeClass} onChange={this.validateAuth.bind(this)}/>
          <button type="button" className={submitAuthClass}>VALIDATE</button>
        </form>
      </div>
    );
  }
}
