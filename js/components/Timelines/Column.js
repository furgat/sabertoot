'use strict';
import React from 'react';

import Card from './Card';

export default class Column extends React.Component {
  render() {
    const {columnHeader, listCards} = this.props;
    var cards = [];

    if (listCards) {
      cards = JSON.parse(listCards).map((entry) => {
        const {id, account, content} = entry;

        return (
          <Card
            key={id ? 'card_' + id : 'card_NaN'}
            displayName={account ? account.display_name : ''}
            cardMsg={content ? content : ''}
          />
        );
      });
    }

    return (
      <div className="column col-xs-4">
        <div className="column-header">
          {columnHeader}
        </div>
        <div className="column-body">
          {cards}
        </div>
      </div>
    )
  }
}
