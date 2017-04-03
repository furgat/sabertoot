import React from 'react';
import {EventEmitter} from 'events';

import Card from '../components/Timelines/Card';
import Column from '../components/Timelines/Column';
import MastoHandler from '../components/MastoStore/MastoHandler';

import {actionTypes, storageIDs, defCol} from '../constants/Constants';

import MastoDispatch from '../dispatchers/MastoDispatch';

const storageAccess = (typeof(Storage) !== undefined && localStorage !== undefined);
const _LOG = false;

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

    if (_LOG) {
      console.log("D: " + JSON.stringify(this.domains));
      console.log("A: " + JSON.stringify(this.accounts));
    }
  }

  // helper functions

  // returns the index of 'name' in 'list', -1 if not found
  getIndex(name, list) {
    for(var i = list.length;i--;) {
      if (list[i].name == name)
        return i;
    }
    return -1;
  }

  // data storage functions

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

  saveOnly() {
    if (storageAccess) {
      window.localStorage.setItem(storageIDs().DOMAINS, JSON.stringify(this.domains));
      window.localStorage.setItem(storageIDs().AUTHS, JSON.stringify(this.accounts));
    }
  }

  saveAndEmit(to_emit) {
    this.saveOnly();
    this.emit(to_emit);
  }

  // account functions

  createAccount(account) {
    this.accounts.push(account);
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

  getAccountWithFlag(flag) {
    const {accounts} = this;
    for(var i = accounts.length;i--;) {
      if (accounts[i].flag == flag)
        return accounts[i];
    }
    return undefined;
  }

  getAccounts() {
    return this.accounts;
  }

  // domain functions

  createDomain({name, api_url, id, client_id, client_secret}) {
    const domainIndex = this.getIndex(name, this.domains);

    if (domainIndex == -1) {
      this.domains.push({name, api_url});
    } else {
      this.domains[domainIndex] = {
        name, api_url, id, client_id, client_secret
      }
    }

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

  // connection functions

  createNewConnection(account) {
    const {name, access_token, domain_name} = account;
    const {api_url} = this.getDomainWithName(domain_name);
    const {connections} = this;

    connections.push({
      name,
      instance: MastoHandler(api_url, access_token)
    });

    return connections.length - 1;
  }

  getConnectionByAccount(account) {
    const {name} = account;
    const {connections} = this;

    if (connections.length > 0) {
      for(var i = connections.length; i--;) {
        if (connections[i].name == name)
          return i;
      }
    }

    return this.createNewConnection(account);
  }

  // timeline functions

  updateTimeline(timeline = defCol().HOME, account = this.getAccountWithFlag('SEL'), options) {
    if (account != undefined) {
      const conn = this.getConnectionByAccount(account);
      const instance = this.connections[conn].instance;

      instance.getTimeline(timeline, options).then((res) => {
        if (!this.connections[conn].json) this.connections[conn].json = new Object();
        this.connections[conn].json[timeline] = res.text;
        if (_LOG) console.log(timeline + ': ' + res.text);
        this.emit('timelines_update');
      });
    }
  }

  getTimelineJSON(timeline = defCol().HOME, account = this.getAccountWithFlag('SEL')) {
    if (account != undefined) {
      const conn = this.getConnectionByAccount(account);

      return (this.connections[conn].json[timeline] ? this.connections[conn].json[timeline] : undefined);
    }
  }

  // actions
  handleActions(action) {
    const {
      UPDATE_TIMELINES, CREATE_ACCOUNT, EDIT_ACCOUNT, REMOVE_ACCOUNT, CREATE_DOMAIN, REMOVE_DOMAIN
    } = actionTypes();

    switch(action.type) {
      case UPDATE_TIMELINES:
        this.updateTimeline(action.timeline, action.account, action.options);
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
