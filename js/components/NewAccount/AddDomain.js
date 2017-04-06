'use strict';
import React from 'react';
import {browserHistory} from 'react-router';
import {regexRef, regexTest} from '../../constants/helperFunctions';
import {createDomain, createAccount} from '../../actions/MastoActions';
import MastoStore from '../../stores/MastoStore';
import {VText} from '../Form/VText';
//TODO: future version, probably create or implement modular form component
// definitely could be far cleaner
export default class AddDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      domains: MastoStore.getDomains(),
      account_name: '',
      account_name_value: '',
      add_toggle: 'plus',
      domain_selector: '',
      domain_selector_value: 'mastodon.social',
      new_domain_form: 'hidden',
      new_domain: {
          name: '',
          api_url: ''
      },
      new_domain_name: '',
      new_domain_api: '',
      submit_new_domain: 'disabled',
      submit_button: 'disabled'
    }
    this.listener = null;
    this.request = require('superagent');
  }

  componentWillMount() {
    this.listener = this.updateFromStore.bind(this);
    MastoStore.on('domains_update', this.listener);
  }

  componentWillUnmount() {
    if (this.listener !== null)
      MastoStore.removeListener('domains_update', this.listener);
  }

  updateFromStore() {
    const getDomains = MastoStore.getDomains();
    const domains = getDomains.map((domain) => {
      return {name: domain.name, api_url: domain.api_url}
    });
    this.setState({domains: domains});
  }

  validateAccountLabel(event) {
    const {ACCOUNT_NAME} = regexRef();
    const value = event.target.value;
    const testAuth = regexTest(ACCOUNT_NAME, value);

    this.setState({
      account_name: (testAuth ? 'valid' : 'invalid'),
      account_name_value: value,
      submit_button: (testAuth ? '' : 'disabled')
    });
  }

// nearly twins
  validateDomainName(event) {
    const {DOMAIN_NAME} = regexRef();
    const value = event.target.value;
    const testAuth = regexTest(DOMAIN_NAME, value);
    const {new_domain_api} = this.state;
    const {api_url} = this.state.new_domain;

    this.setState({
      new_domain_name: (testAuth ? 'valid' : 'invalid'),
      new_domain: {name: value, api_url}
    }, () => {
      this.setState({
        submit_new_domain: (testAuth && new_domain_api == 'valid' ? '' : 'disabled')
      });
    });
  }

// nearly twins
  validateDomainApi(event) {
    const {URL} = regexRef();
    const value = event.target.value;
    const testAuth = regexTest(URL, value);
    const {new_domain_name} = this.state;
    const {name} = this.state.new_domain;

    this.setState({
      new_domain_api: (testAuth ? 'valid' : 'invalid'),
      new_domain: {name, api_url: value}
    }, () => {
      this.setState({
        submit_new_domain: (testAuth && new_domain_name == 'valid' ? '' : 'disabled')
      });
    });
  }

  selectDomain(event) {
    this.setState({
      domain_selector_value: event.target.value
    });
  }

  addToggleClick(event) {
    const addToggleState = this.state.add_toggle == 'plus';

    this.setState({
      add_toggle: (addToggleState ? 'minus' : 'plus'),
      domain_selector: (addToggleState ? 'disabled' : ''),
      submit_button: (addToggleState ? 'disabled' : ''),
      new_domain_form: (addToggleState ? '' : 'hidden')
    })
  }

  submitNewDomain(event) {
    event.preventDefault();
    const {submit_new_domain} = this.state;
    if (submit_new_domain == 'disabled') return;

    this.setState({
      'submit_new_domain': 'disabled' // prevent multi-submit
    }, () => {
      const {name, api_url} = this.state.new_domain;

      createDomain({name, api_url});

      this.setState({
        add_toggle: 'plus',
        domain_selector: '',
        submit_button: '',
        new_domain: {
          name: '',
          api_url: ''
        },
        new_domain_form: 'hidden'
      });
    });
  }

  domainIndex(name) {
    var {domains} = this.state;

    for(var i = domains.length; i--; )
      if (domains[i].name == name)
        return i;

    return -1;
  }

  registerWithDomain(event) {
    const {submit_button} = this.state;
    if (submit_button == 'disabled') return;

    this.setState({
      'submit_button': 'disabled' // prevent multi-submit
    }, () => {
      const {name, api_url, client_id} = this.state.domains[this.domainIndex(this.state.domain_selector_value)];

      if (client_id == undefined) {
        this.request.post(api_url + 'apps')
          .type('form')
          .send({
            response_type: 'code',
            client_name: 'sabertoot',
            redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'read write follow',
            website: 'https://github.com/furgat/sabertoot'
          })
          .end((error, response) => {
            if (!response.error) {
              const {id, client_id, client_secret} = response.body;

              createDomain({name, api_url, id, client_id, client_secret});

              this.redirectToAddAccount(name);
            } else {
              this.setState({
                'submit_button': ''
              });
            }
          });
      } else {
        this.redirectToAddAccount(name);
      }
    });
  }

  redirectToAddAccount(domain_name) {
    const {account_name_value} = this.state;

    createAccount({
      name: account_name_value,
      domain_name,
      flag: 'PROG'
    });

    this.props.router.push('/newaccount/user')//+account_name_value);
  }

  render() {
    const {
      account_name, add_toggle, domain_selector, submit_button,
      new_domain_form, new_domain_name, new_domain_api, submit_new_domain
    } = this.state;

    const accountNameClass = 'account-name form-control ' + account_name;
    const addToggleClass = add_toggle + ' add-toggle btn btn-primary col-xs-2';
    const addToggleGlyph = 'glyphicon glyphicon-' + add_toggle;

    const domainSelectorClass = 'form-control domain-selector col-xs-10 ' + domain_selector;
    const domainOptions = this.state.domains.map(
      (domain, id) => (<option key={id} value={domain.name}>{domain.name}</option>)
    );
    const submitButtonClass = 'btn btn-primary submit-button ' + submit_button;

    const newDomainFormClass = 'form-group new-domain-form well ' + new_domain_form;
    const newDomainNameClass = 'form-control new-domain-name ' + new_domain_name;
    const newDomainApiClass = 'form-control new-domain-api ' + new_domain_api;
    const submitNewDomainClass = 'btn btn-default submit-new-domain ' + submit_new_domain;

    return (
      <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 add-domain">
        <h1>New Account</h1>
        <form className="domain-form">
          <div className="form-group">
            <label className="account-name-label">Account Label</label>
            <input type="text" className={accountNameClass} onChange={this.validateAccountLabel.bind(this)} />
          </div>

          <div className="form-group">
            <label className="domain-selector-label">Select Domain</label>

            <span className="input-group">
              <select className={domainSelectorClass} onChange={this.selectDomain.bind(this)} defaultValue="mastodon.social">
                {domainOptions}
              </select>
              <span className="input-group-btn">
                <button className={addToggleClass} onClick={this.addToggleClick.bind(this)}>
                  <span className={addToggleGlyph} aria-hidden="true"></span>&nbsp;Add
                </button>
              </span>
            </span>
          </div>

          <div className={newDomainFormClass}>
            <div className="form-group">
              <label className="new-domain-name-label">New Domain Name</label>
              <input type="text" className={newDomainNameClass} onChange={this.validateDomainName.bind(this)}/>
            </div>

            <div className="form-group">
              <label className="new-domain-api-label">New Domain Name</label>
              <input type="text" className={newDomainApiClass} onChange={this.validateDomainApi.bind(this)}/>
            </div>

            <button className={submitNewDomainClass} onClick={this.submitNewDomain.bind(this)}>ADD DOMAIN</button>
          </div>

          <button className={submitButtonClass} onClick={this.registerWithDomain.bind(this)}>REQUEST OAUTH</button>
        </form>
      </div>
    )
  }
}
