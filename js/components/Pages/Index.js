import React from 'react';
import {browserHistory} from 'react-router';
import ReactTimeout from 'react-timeout'

import {storageIDs} from '../../constants/Constants';

const storageAccess = (typeof(Storage) !== undefined);

export default class Index extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (storageAccess) {
      const dataCheck = window.localStorage.getItem(storageIDs().AUTHS);

      if (dataCheck == undefined || dataCheck == null)
        this.props.router.push('/newaccount/domain');
      else
        this.props.router.push('/timelines');
    } else {
      // error page about needing local storage to use this app
    }
  }

  render() {
    return (
      <div className="init">
      </div>
    );
  }
}
