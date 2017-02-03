import React from 'react';
import {EventEmitter} from 'events';

import MastoDispatch from '../dispatchers/MastoDispatch';
import Card from '../components/Timelines/Card';
import Column from '../components/Timelines/Column';

import {actionTypes} from '../constants/Constants';

class MastoStore extends EventEmitter {
  constructor() {
    super();
    // {name, api_url, id, c_id, c_secret}
    this.domains = [
      {name: 'mastodon.social', api_url: 'https://mastodon.social/api/vi/'}
    ];
    // {name, access_code, domain}
    this.accounts = [];
    // list of Mastodon objects
    this.connections = [];
  }

  updateTimelines() {
    //TODO: update timelines
    this.emit('timelines_update');
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
    this.emit('accounts_update');
  }

  removeAccount(accountName) {
    const index = this.getIndex(accountName, this.accounts);
    if (index != -1) {
      this.accounts.splice(this.getIndex(accountName, this.accounts), 1);
    }
    this.emit('accounts_update');
  }

  createDomain(domain) {
    this.domains.push(domain);
    this.emit('domains_update');
  }

  removeDomain(domainName) {
    const index = this.getIndex(domainName, this.domains);
    if (index != -1) {
      this.domains.splice(this.getIndex(domainName, this.domains), 1);
    }
    this.emit('domains_update');
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
    const {
      UPDATE_TIMELINES, CREATE_ACCOUNT, REMOVE_ACCOUNT, CREATE_DOMAIN, REMOVE_DOMAIN
    } = actionTypes();

    switch(action.type) {
      case UPDATE_TIMELINES:
        this.updateTimelines.bind(this);
        break;
      case CREATE_ACCOUNT:
        this.createAccount(action.account);
        break;
      case REMOVE_ACCOUNT:
        this.removeAccount(action.name);
        break;
      case CREATE_DOMAIN:
        this.createDomain(action.domain);
        break;
      case REMOVE_DOMAIN:
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
