import MastoDispatch from '../dispatchers/MastoDispatch';
import * as types from '../constants/actionTypes';

export function updateTimelines() {
  MastoDispatch.dispatch({type: types.UPDATE_TIMELINES});
}

export function createDomain(domain) {
  MastoDispatch.dispatch({type: types.CREATE_DOMAIN, domain});
}

export function removeDomain(domainName) {
  MastoDispatch.dispatch({type: types.REMOVE_DOMAIN, domainName});
}

export function newDomainOauth(account) {
  MastoDispatch.dispatch({type: types.NEW_DOMAIN_OAUTH, account});
}

export function createAccount(account) {
  MastoDispatch.dispatch({type: types.CREATE_ACCOUNT, account});
}

export function removeAccount(accountName) {
  MastoDispatch.dispatch({type: types.REMOVE_ACCOUNT, accountName});
}

// ...
