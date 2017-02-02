import React from 'react';
import ReactTimeout from 'react-timeout'

import AddAccount from '../NewAccount/AddAccount';
import AddDomain from '../NewAccount/AddDomain';

export default class NewAccount extends React.Component {
  render() {
    return (
      <div className="new-account">
        {this.props.children}
      </div>
    );
  }
}
