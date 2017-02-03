import React from 'react';
import {browserHistory} from 'react-router';
import ReactTimeout from 'react-timeout'

import {storageIDs} from '../../constants/Constants';

export default class Index extends React.Component {
  constructor() {
    super();

    const dataCheck = window.localStorage.getItem(storageIDs().AUTHS);

    if (dataCheck == undefined || dataCheck == null)
      browserHistory.push('#/newaccount')
    else
      browserHistory.push('#/timelines')
  }

  render() {
    return (
      <div className="init">
      </div>
    );
  }
}
