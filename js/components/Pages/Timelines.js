import React from 'react';

import Navigation from '../Timelines/Navigation';

export default class Timelines extends React.Component {
  render() {
    const {listColumns} = this.props;

    return (
      <div className="timelines">
        <Navigation />
        <div className="timelines-body">
          {listColumns}
        </div>
      </div>
    )
  }
}
