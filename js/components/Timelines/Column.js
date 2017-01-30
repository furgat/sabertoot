import React from 'react';

import Card from './Card';

export default class Column extends React.Component {
  render() {
    const {listCards, columnHeader} = this.props;

    return (
      <div className="column col-xs-4">
        <div className="column-header">
          {columnHeader}
        </div>
        <div className="column-body">
          {listCards}
        </div>
      </div>
    )
  }
}
