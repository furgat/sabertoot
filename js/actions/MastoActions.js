'use strict';
import MastoDispatch from '../dispatchers/MastoDispatch';
import {actionTypes} from '../constants/Constants';

export function updateTimeline(timeline, account, options) {
  MastoDispatch.dispatch({type: actionTypes().UPDATE_TIMELINES, timeline, account, options});
}

export function createDomain(domain) {
  MastoDispatch.dispatch({type: actionTypes().CREATE_DOMAIN, domain});
}

export function removeDomain(domainName) {
  MastoDispatch.dispatch({type: actionTypes().REMOVE_DOMAIN, domainName});
}

export function newDomainOauth(account) {
  MastoDispatch.dispatch({type: actionTypes().NEW_DOMAIN_OAUTH, account});
}

export function createAccount(account) {
  MastoDispatch.dispatch({type: actionTypes().CREATE_ACCOUNT, account});
}

export function removeAccount(accountName) {
  MastoDispatch.dispatch({type: actionTypes().REMOVE_ACCOUNT, accountName});
}

export function editAccount(account) {
  MastoDispatch.dispatch({type: actionTypes().EDIT_ACCOUNT, account});
}

// ...
