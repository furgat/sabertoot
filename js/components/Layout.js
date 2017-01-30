import React from 'react';

export default class Layout extends React.Component {
  navigate() {
    this.props.history.replaceState(null, "/timelines");
  }

  render() {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    )
  }
}
