import MastoDispatch from '../dispatchers/MastoDispatch';
import actionTypes from '../constants/actionTypes';

export function updateTimelines() {
  MastoDispatch.dispatch({type: actionTypes().UPDATE_TIMELINES});
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

// ...
