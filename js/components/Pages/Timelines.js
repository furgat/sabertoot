import React from 'react';
import ReactTimeout from 'react-timeout'

import Navigation from '../Timelines/Navigation';
import Column from '../Timelines/Column';

import MastoStore from '../../stores/MastoStore';

import {updateTimeline} from '../../actions/MastoActions';

import {defCol} from '../../constants/Constants';

export default class Timelines extends React.Component {
  constructor() {
    super();
    this.state = {
      renderColumns: []
    };

  }

  componentWillMount() {
    MastoStore.on('timelines_update', this.updateFromStore.bind(this));
  }

  componentWillUnmount() {
    MastoStore.removeListener('timelines_update', this.updateFromStore.bind(this));
  }

  makeColumn(header, data) {
    return (<Column key={'col'+header} header={header} data={data} />);
  }

  refresh() {
    updateTimeline();
  }

  updateFromStore() {
    this.setState({
      renderColumns:[
        this.makeColumn(defCol().HOME, MastoStore.getTimelineJSON(defCol().HOME))
      ]
    });
  }

  render() {
    const { renderColumns } = this.state;

    return (
      <div className="timelines">
        <Navigation />
        <div className="timelines-body">
          <button className="btn btn-primary" onClick={this.refresh}>Refresh</button>
          {renderColumns}
        </div>
      </div>
    );
  }
}
