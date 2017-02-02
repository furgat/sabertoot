import React from 'react';

//TODO: future version, probably create or implement modular form component
export default class AddDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      account_name: '',
      add_toggle: 'plus',
      domain_selector: '',
      new_domain_form: 'hidden',
      submit_button: '',
      submit_new_domain: 'disabled'
    }
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
      new_domain_form, submit_new_domain
    } = this.state;

    const accountNameClass = "account-name " + account_name;
    const addToggleClass = "add-toggle " + add_toggle;
    const domainSelectorClass = "domain-selector " + domain_selector;
    const submitButtonClass = "submit-button " + submit_button;

    const newDomainFormClass = "new-domain-form " + new_domain_form;
    const submitNewDomainClass = "submit-new-domain " + submit_new_domain;

    return (
      <div className="add-domain">
        <form className="domain-form">
          <label className="account-name-label">Account Name</label>
          <input type="text" className={accountNameClass} />

          <label className="domain-selector-label">Select Domain</label>
          <select className={domainSelectorClass} defaultValue="mastodon.social">
            <option value="mastodon.social">Mastodon</option>
          </select>

          <button className={addToggleClass} onClick={this.addToggleClick.bind(this)}></button>

          <form className={newDomainFormClass}>
            <label className="new-domain-name-label">New Domain Name</label>
            <input type="text" className="new-domain-name" />

            <label className="new-domain-api-label">New Domain Name</label>
            <input type="text" className="new-domain-api" />

            <button className={submitNewDomainClass}>ADD DOMAIN</button>
          </form>

          <button className={submitButtonClass}>REQUEST AUTH</button>
        </form>
      </div>
    )
  }
}
