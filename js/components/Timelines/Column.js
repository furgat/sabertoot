import React from 'react';

import Card from './Card';

export default class Column extends React.Component {
  render() {
    const {listCards} = this.props;

    return (
      <div className="column">
        <div className="column-header">
        </div>
        <div className="column-body">
          {listCards}
        </div>
      </div>
    )
  }
}
