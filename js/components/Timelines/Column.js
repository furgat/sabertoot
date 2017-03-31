import React from 'react';

import Card from './Card';

export default class Column extends React.Component {
  render() {
    const {header, data} = this.props;
    var cards = [];

    if (data) {
      cards = JSON.parse(data).map((entry) => {
        return (
          <Card
            key={'card'+entry.id}
            displayName={entry.account.display_name}
            cardMsg={entry.content}
          />
        );
      });
    }

    return (
      <div className="column col-xs-4">
        <div className="column-header">
          {header}
        </div>
        <div className="column-body">
          {cards}
        </div>
      </div>
    )
  }
}
