import React from 'react';
import ReactTimeout from 'react-timeout'

import Navigation from '../Timelines/Navigation';

import MastoStore from '../../stores/MastoStore';
import * as MastoActions from '../../actions/MastoActions';

export default class Timelines extends React.Component {
  constructor() {
    super();
    this.updateFromStore = this.updateFromStore.bind(this);
    this.state = {
      listColumns: [
        MastoStore.getHomeTimeline(),
        MastoStore.getNoteTimeline(),
        MastoStore.getFediverseTimeline()
      ],
    };
  }

  componentWillMount() {
    MastoStore.on('update', this.updateFromStore);
  }

  componentWillUnmount() {
    MastoStore.removeListener('update', this.updateFromStore);
  }

  updateFromStore() {
    this.setState({
      listColumns: [
        MastoStore.getHomeTimeline(),
        MastoStore.getNoteTimeline(),
        MastoStore.getFediverseTimeline()
      ]
    });
  }

  render() {
    const { listColumns } = this.state;

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
