'use strict';
import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="navigation">
        <button className="user-button"></button>
        <button className="toot-button"></button>
        <button className="settings-button"></button>
      </nav>
    )
  }
}
