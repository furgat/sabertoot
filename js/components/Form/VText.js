'use strict';
import React from 'react';

export default class VText extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
  }

  getState() { return this.state.valid; }

  lock() {}

  unlock() {}

  render() {
    const {className, validClass, invalidClass, regex, changeCallback} = this.props;

    return (
      <input
        type="text"
        className={className + ' ' + (this.state.valid ? validClass : invalidClass)}
        onChange={
          (event) => {
            this.setState({valid:regex.test(event.target.value)});
            if (typeof changeCallback === 'function') changeCallback(this.state.valid);
          }
        }
      />
    )
  }
}
