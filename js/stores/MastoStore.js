import React from 'react';
import {EventEmitter} from 'events';

import Card from '../components/Timelines/Card';
import Column from '../components/Timelines/Column';
import MastoHandler from '../components/MastoStore/MastoHandler';

import {actionTypes, storageIDs} from '../constants/Constants';

import MastoDispatch from '../dispatchers/MastoDispatch';

const storageAccess = (typeof(Storage) !== undefined && localStorage !== undefined);

class MastoStore extends EventEmitter {
  constructor() {
    super();
    // {name, api_url, id, c_id, c_secret}
    this.domains = [];
    // {name, access_token, domain_name, flag}
    this.accounts = [];

    // list of MastoHandlers
    this.connections = [];

    const loadedDomains = this.loadFromStorage(storageIDs().DOMAINS);
    const loadedAuths = this.loadFromStorage(storageIDs().AUTHS);

    console.log(loadedDomains + ' & ' + loadedAuths);

    if (loadedDomains != 'EMPTY') {
      this.domains = this.domains.concat(loadedDomains);
    } else {
      // default array, can easily be added to later
      this.domains = [
        {name: 'mastodon.social', api_url: 'https://mastodon.social/api/v1/'}
      ];
      this.saveOnly();
    }

    if (loadedAuths != 'EMPTY') {
      this.accounts = this.accounts.concat(loadedAuths);
      this.accounts[0].flag = 'SEL';
    }

    console.log("D: " + JSON.stringify(this.domains));
    console.log("A: " + JSON.stringify(this.accounts));
  }

  loadFromStorage(id) {
    if (storageAccess) {
      const storedData = window.localStorage.getItem(id);

      if (storedData == undefined || storedData == '[]') {
        return 'EMPTY';
      } else {
        const jsonData = JSON.parse(storedData);
        return jsonData;
      }
    }
  }

  updateTimelines() {
    //TODO: update timelines
    this.emit('timelines_update');
  }

  // helper function
  // returns the index of 'name' in 'list', -1 if not found
  getIndex(name, list) {
    for(var i = list.length;i--;) {
      if (list[i].name == name)
        return i;
    }
    return -1;
  }

  saveOnly() {
    if (storageAccess) {
      window.localStorage.setItem(storageIDs().DOMAINS, JSON.stringify(this.domains));
      window.localStorage.setItem(storageIDs().AUTHS, JSON.stringify(this.accounts));

      console.log("D: " + JSON.stringify(this.domains));
      console.log("A: " + JSON.stringify(this.accounts));
    }
  }

  saveAndEmit(to_emit) {
    this.saveOnly();
    this.emit(to_emit);
  }

  createAccount(account) {
    this.accounts.push(account);
    console.log(JSON.stringify(this.accounts));
    this.saveAndEmit('accounts_update');
  }

  editAccount(account) {
    const index = this.getIndex(account.name, this.accounts);

    // if the account doesn't exist, just redirect to create
    if (index == -1)
      this.createAccount(account);

    this.accounts[index] = account; // replace in place

    this.saveAndEmit('accounts_update');
  }

  removeAccount(accountName) {
    const index = this.getIndex(accountName, this.accounts);

    if (index != -1) {
      this.accounts.splice(index, 1);
    }

    this.saveAndEmit('accounts_update');
  }

  createDomain({name, api_url, id, client_id, client_secret}) {
    const domainIndex = this.getIndex(name, this.domains);

    if (domainIndex == -1) {
      this.domains.push({name, api_url});
    } else {
      this.domains[domainIndex] = {
        name, api_url, id, client_id, client_secret
      }
    }

    // store domains
    this.saveAndEmit('domains_update');
  }

  removeDomain(domainName) {
    const index = this.getIndex(domainName, this.domains);

    if (index != -1) {
      this.domains.splice(index, 1);
    }

    this.saveAndEmit('domains_update');
  }

  getDomains() {
    return this.domains;
  }

  getDomainWithName(name) {
    const {domains} = this;
    const index = this.getIndex(name, domains);

    return domains[index];
  }

  getAccountWithFlag(flag) {
    const {accounts} = this;
    for(var i = accounts.length;i--;) {
      if (accounts[i].flag == flag)
        return accounts[i];
    }
    return null;
  }

  getAccounts() {
    return this.accounts;
  }

  makeCard(html) {
    //TODO: makeCard;
  }

  makeColumn(k, header, cards) {
    return (<Column key={k} columnHeader={header} listCards={cards} />);
  }

  createNewConnection(account) {
    const {name, access_code, domain_name} = account;
    const {api_url} = this.getDomainWithName(domain_name);
    const {connections} = this;
    console.log(api_url + ', ' + access_code);
    connections.push({
      name,
      instance: new MastoHandler(api_url, access_code)
    });

    return connections[connections.length - 1].instance;
  }

  getConnectionByAccount(account) {
    const {name} = account;
    const {connections} = this;

    if (connections.length > 0) {
      for(var i = connections.length; i--;) {
        if (connections[i].name == name)
          return connections[i].instance;
      }
    }

    return this.createNewConnection(account);
  }

  getHomeTimeline(account = this.getAccountWithFlag('SEL')) {
    /*const {columnHeader, listCards} = this.accounts[username].columns['home'];
    return this.makeColumn('home', columnHeader, listCards);*/
    const conn = this.getConnectionByAccount(account);

    conn.getTimeline('home').then((res) => {
      console.log(JSON.stringify(res))
    });
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
      UPDATE_TIMELINES, CREATE_ACCOUNT, EDIT_ACCOUNT, REMOVE_ACCOUNT, CREATE_DOMAIN, REMOVE_DOMAIN
    } = actionTypes();

    switch(action.type) {
      case UPDATE_TIMELINES:
        this.updateTimelines.bind(this);
        break;
      case CREATE_ACCOUNT:
        this.createAccount(action.account);
        break;
      case EDIT_ACCOUNT:
        this.editAccount(action.account);
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
