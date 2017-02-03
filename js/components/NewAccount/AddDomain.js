import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';
import {createDomain} from '../../actions/MastoActions';
import MastoStore from '../../stores/MastoStore';

//TODO: future version, probably create or implement modular form component
// definitely could be far cleaner
export default class AddDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      domains: [
        {
          name: 'mastodon.social',
          api_url: 'https://mastodon.social/api/v1/'
        }
      ],
      account_name: '',
      add_toggle: 'plus',
      domain_selector: '',
      new_domain_form: 'hidden',
      new_domain: {
          name: '',
          api_url: ''
      },
      new_domain_name: '',
      new_domain_api: '',
      submit_new_domain: 'disabled',
      submit_button: ''
    }
  }

  componentWillMount() {
    MastoStore.on('domains_update', this.updateFromStore.bind(this));
  }

  componentWillUnmount() {
    MastoStore.removeListener('domains_update', this.updateFromStore.bind(this));
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
    const testAuth = regexTest(ACCOUNT_NAME, event.target.value);

    this.setState({
      account_name: (testAuth ? 'valid' : 'invalid')
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
      new_domain: {name: (testAuth ? value : ''), api_url}
    }, () => {
      console.log(this.state.new_domain.name);
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
      new_domain: {name, api_url: (testAuth ? value : '')}
    }, () => {
      console.log(this.state.new_domain.name);
      this.setState({
        submit_new_domain: (testAuth && new_domain_name == 'valid' ? '' : 'disabled')
      });
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

    console.log(this.state.new_domain.name);
    const {name, api_url} = this.state.new_domain;

    createDomain({name, api_url});

    this.setState({
      add_toggle: 'plus',
      domain_selector: '',
      submit_button: '',
      new_domain_form: 'hidden'
    })
  }

  registerWithDomain(event) {
    const {submit_button} = this.state;
    if (submit_button == 'disabled') return;

    // disptch action
  }

  render() {
    const {
      account_name, add_toggle, domain_selector, submit_button,
      new_domain_form, new_domain_name, new_domain_api, submit_new_domain
    } = this.state;

    const accountNameClass = 'form-control ccount-name ' + account_name;
    const addToggleClass = 'add-toggle ' + add_toggle;
    const domainSelectorClass = 'form-control domain-selector ' + domain_selector;
    const domainOptions = this.state.domains.map(
      (domain, id) => (<option key={id} value={domain.name}>{domain.name}</option>)
    );
    const submitButtonClass = 'btn btn-primary submit-button ' + submit_button;

    const newDomainFormClass = 'form-group new-domain-form ' + new_domain_form;
    const newDomainNameClass = 'form-control new-domain-name ' + new_domain_name;
    const newDomainApiClass = 'form-control new-domain-api ' + new_domain_api;
    const submitNewDomainClass = 'btn btn-default submit-new-domain ' + submit_new_domain;

    return (
      <div className="col-xs-6 add-domain">
        <div className="domain-form form-group">
          <label className="account-name-label">Account Label</label>
          <input type="text" className={accountNameClass} onChange={this.validateAccountLabel.bind(this)} />

          <label className="domain-selector-label">Select Domain</label>
          <select className={domainSelectorClass} defaultValue="mastodon.social">
            {domainOptions}
          </select>

          <button className={addToggleClass} onClick={this.addToggleClick.bind(this)}></button>

          <form className={newDomainFormClass}>
            <label className="new-domain-name-label">New Domain Name</label>
            <input type="text" className={newDomainNameClass} onBlur={this.validateDomainName.bind(this)}/>

            <label className="new-domain-api-label">New Domain Name</label>
            <input type="text" className={newDomainApiClass} onBlur={this.validateDomainApi.bind(this)}/>

            <button className={submitNewDomainClass} onClick={this.submitNewDomain.bind(this)}>ADD DOMAIN</button>
          </form>

          <button className={submitButtonClass}>REQUEST AUTH</button>
        </div>
      </div>
    )
  }
}
