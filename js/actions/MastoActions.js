import MastoDispatch from '../dispatchers/MastoDispatch';

export function updateTimelines() {
  MastoDispatch.dispatch({type:'UPDATE_TIMELINES'});
}

export function createDomain(domain) {
  MastoDispatch.dispatch({type: 'CREATE_DOMAIN', domain});
}

export function removeDomain(domainName) {
  MastoDispatch.dispatch({type: 'REMOVE_DOMAIN', domainName});
}

export function createAccount(account) {
  MastoDispatch.dispatch({type: 'CREATE_ACCOUNT', account});
}

export function removeAccount(accountName) {
  MastoDispatch.dispatch({type: 'REMOVE_ACCOUNT', accountName});
}

// ...
