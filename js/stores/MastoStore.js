import React from 'react';
import {EventEmitter} from 'events';

import MastoDispatch from '../dispatchers/MastoDispatch';
import Card from '../components/Timelines/Card';
import Column from '../components/Timelines/Column';

import * as types from '../constants/actionTypes';

class MastoStore extends EventEmitter {
  constructor() {
    super();
    this.domains = [];
    this.accounts = [];
  }

  updateTimelines() {
    //TODO: update timelines
    this.emit('update');
  }

  getIndex(key, list) {
    for(var i = list.length;i--;) {
      if (list[i].name == key)
        return i;
    }
    return -1;
  }

  createAccount(account) {
    this.accounts.push(account);
  }

  removeAccount(accountName) {
    const index = this.getIndex(accountName, this.accounts);
    if (index != -1) {
      this.accounts.splice(this.getIndex(accountName, this.accounts), 1);
    }
  }

  createDomain(domain) {
    this.domains.push(domain);
  }

  removeDomain(domainName) {
    const index = this.getIndex(domainName, this.domains);
    if (index != -1) {
      this.domains.splice(this.getIndex(domainName, this.domains), 1);
    }
  }

  getDomains () {
    return this.domains;
  }

  getAccounts () {
    return this.accounts;
  }

  makeCard(html) {
    //TODO: makeCard;
  }

  makeColumn(k, header, cards) {
    return (<Column key={k} columnHeader={header} listCards={cards} />);
  }

  getHomeTimeline(username) {
    /*const {columnHeader, listCards} = this.accounts[username].columns['home'];
    return this.makeColumn('home', columnHeader, listCards);*/
  }

  getNoteTimeline(username) {
    /*const {columnHeader, listCards} = this.accounts[username].columns['note'];
    return this.makeColumn('notes', columnHeader, listCards);*/
  }

  getFediverseTimeline(username) {
    /*const {columnHeader, listCards} = this.accounts[username].columns['fediverse'];
    return this.makeColumn('fediverse', columnHeader, listCards);*/
  }

  handleActions(action) {
    console.log(action);
    //TODO: handle actions
    switch(action.type) {
      case types.UPDATE_TIMELINES:
        this.updateTimelines.bind(this);
        break;
      case types.CREATE_ACCOUNT:
        this.createAccount(action.account);
        break;
      case types.REMOVE_ACCOUNT:
        this.removeAccount(action.name);
        break;
      case types.CREATE_DOMAIN:
        this.createDomain(action.domain);
        break;
      case types.REMOVE_DOMAIN:
        this.removeDomain(action.name);
        break;
      default:
        break;
    }
  }
}

const mastoStore = new MastoStore();
MastoDispatch.register(mastoStore.handleActions.bind(mastoStore));
//window.mastoStore = mastoStore;
export default mastoStore;
