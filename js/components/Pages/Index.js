import React from 'react';
import ReactTimeout from 'react-timeout'

export default class Index extends React.Component {
  constructor() {
    super();
  }

  // TODO: somewhere this component should check local storage for credentials
  // if none are found, navigate the user to AddDomain
  // if credentials are found, navigate the user to Timelines

  render() {
    return (
      <div className="init">
      </div>
    );
  }
}
