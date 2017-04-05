import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';
import {editAccount} from '../../actions/MastoActions';
import MastoStore from '../../stores/MastoStore';

//TODO: future version, probably create or implement modular form component
export default class AddAccount extends React.Component {
  constructor() {
    super();
    var OAuth2 = require('oauth').OAuth2;
    const account = MastoStore.getAccountWithFlag('PROG');
    const domain = MastoStore.getDomainWithName(domain_name);

    const {name, domain_name} = (account ? account : {name:'', domain_name:''});
    const {api_url, client_id, client_secret} = (domain ? domain : {api_url:'http://github.com', client_id:'', client_secret:''});
    const domain_url = api_url.split('/');

    this.state = {
      auth_code: '',
      auth_input: '',
      submit_auth: 'disabled',
      account_hold: {
        name, domain_name
      },
      oauth: new OAuth2(
        client_id,
        client_secret,
        domain_url[0] + '//' + domain_url[2],
        null, '/oauth/token'),

    }

    var oauth_url = this.state.oauth.getAuthorizeUrl({
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
      response_type: 'code',
      scope: 'read write follow'
    });

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
    const {auth_code, oauth} = this.state;

    oauth.getOAuthAccessToken(
      auth_code,
      {
        grant_type: 'authorization_code',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
      },
      (err, accessToken, refreshToken, res) => {
        const {name, domain_name} = this.state.account_hold;
        console.log(accessToken);
        editAccount({name, access_token: accessToken, domain_name});
        this.props.router.push('/timelines');
      }
    );
  }

  render() {
    const {auth_input, submit_auth} = this.state;
    const authCodeClass = 'auth-code form-control ' + auth_input;
    const submitAuthClass = 'submit-auth btn btn-primary ' + submit_auth;

    return (
      <div className="add-account col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
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
