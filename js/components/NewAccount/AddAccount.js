import React from 'react';

//TODO: future version, probably create or implement modular form component
export default class AddAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_code: '',
      auth_input_state: ''
    }
  }

  validateAuth(event) {
    const inputCode = event.target.value;
    const validInput = /\d{6}/;
    this.setState({
      auth_input_state: (validInput.test(inputCode) ? 'valid' : 'invalid')
    });
  }

  render() {
    return (
      <div className="add-account">
        <form className="auth-form">
          <label className="auth-code-label">Authorization Code:</label>
          <input type="text" className={"auth-code "+this.state.auth_input_state} onChange={this.validateAuth.bind(this)}/>
          <button type="button" className="submit-auth disabled">VALIDATE</button>
        </form>
      </div>
    );
  }
}
