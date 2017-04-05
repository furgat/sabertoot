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
    return (<Column key={'col'+header} columnHeader={header} listCards={data} />);
  }

  clickRefresh(timeline) {
    updateTimeline(timeline);
  }

  updateFromStore() {
    var renderColumns = [];
    renderColumns.push(this.makeColumn(defCol().HOME, MastoStore.getTimelineJSON(defCol().HOME)));
    renderColumns.push(this.makeColumn(defCol().NOTE, MastoStore.getTimelineJSON(defCol().NOTE)));
    renderColumns.push(this.makeColumn(defCol().FEDI, MastoStore.getTimelineJSON(defCol().FEDI)));
    this.setState({renderColumns});
  }

  render() {
    const { renderColumns } = this.state;

    return (
      <div className="timelines">
        <Navigation />
        <div className="timelines-body">
          <div className="col-xs-2">
            <div className="form-group">

            </div>
            <button className="btn btn-primary" onClick={this.clickRefresh.bind(this, defCol().HOME)}>Refresh Home</button>
            <button className="btn btn-primary" onClick={this.clickRefresh.bind(this, defCol().NOTE)}>Refresh Notes</button>
            <button className="btn btn-primary" onClick={this.clickRefresh.bind(this, defCol().FEDI)}>Refresh Fediv</button>
          </div>
          <div className="col-xs-10">
            {renderColumns}
          </div>
        </div>
      </div>
    );
  }
}
