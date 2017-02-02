import React from 'react';
import {regexRef, regexTest} from '../../constants/helperFunctions';

//TODO: future version, probably create or implement modular form component
export default class AddDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      account_name: '',
      add_toggle: 'plus',
      domain_selector: '',
      new_domain_form: 'hidden',
      new_domain_name: '',
      new_domain_api: '',
      submit_new_domain: 'disabled',
      submit_button: ''
    }
  }

  validateAccountLabel(event) {
    const {ACCOUNT_NAME} = regexRef();
    const testAuth = regexTest(ACCOUNT_NAME, event.target.value);
    this.setState({
      account_name: (testAuth ? 'valid' : 'invalid')
    });
  }

  validateDomainName(event) {
    const {DOMAIN_NAME} = regexRef();
    const testAuth = regexTest(DOMAIN_NAME, event.target.value);
    const {new_domain_api} = this.state;
    this.setState({
      new_domain_name: (testAuth ? 'valid' : 'invalid'),
      submit_new_domain: (testAuth && new_domain_api ? '' : 'disabled')
    });
  }

  validateDomainApi(event) {
    const {URL} = regexRef();
    const testAuth = regexTest(URL, event.target.value);
    const {new_domain_name} = this.state;
    this.setState({
      new_domain_api: (testAuth ? 'valid' : 'invalid'),
      submit_new_domain: (testAuth && new_domain_name ? '' : 'disabled')
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

  render() {
    const {
      account_name, add_toggle, domain_selector, submit_button,
      new_domain_form, new_domain_name, new_domain_api, submit_new_domain
    } = this.state;

    const accountNameClass = 'account-name ' + account_name;
    const addToggleClass = 'add-toggle ' + add_toggle;
    const domainSelectorClass = 'domain-selector ' + domain_selector;
    const submitButtonClass = 'submit-button ' + submit_button;

    const newDomainFormClass = 'new-domain-form ' + new_domain_form;
    const newDomainNameClass = 'new-domain-name ' + new_domain_name;
    const newDomainApiClass = 'new-domain-api ' + new_domain_api;
    const submitNewDomainClass = 'submit-new-domain ' + submit_new_domain;

    return (
      <div className="add-domain">
        <form className="domain-form">
          <label className="account-name-label">Account Label</label>
          <input type="text" className={accountNameClass} onChange={this.validateAccountLabel.bind(this)} />

          <label className="domain-selector-label">Select Domain</label>
          <select className={domainSelectorClass} defaultValue="mastodon.social">
            <option value="mastodon.social">Mastodon</option>
          </select>

          <button className={addToggleClass} onClick={this.addToggleClick.bind(this)}></button>

          <form className={newDomainFormClass}>
            <label className="new-domain-name-label">New Domain Name</label>
            <input type="text" className={newDomainNameClass} onChange={this.validateDomainName.bind(this)}/>

            <label className="new-domain-api-label">New Domain Name</label>
            <input type="text" className={newDomainApiClass} onChange={this.validateDomainApi.bind(this)}/>

            <button className={submitNewDomainClass}>ADD DOMAIN</button>
          </form>

          <button className={submitButtonClass}>REQUEST AUTH</button>
        </form>
      </div>
    )
  }
}
