export function storageIDs() {
  const IDs = {
    DOMAINS: 'fstoot_dom',
    AUTHS: 'fstoot_aut',
    SETTINGS: 'fstoot_set'
  }

  return IDs;
}

export function actionTypes() {
  const types = {
    UPDATE_TIMELINES: 0,
    CREATE_DOMAIN: 1,
    REMOVE_DOMAIN: 2,
    NEW_DOMAIN_OAUTH: 3,
    CREATE_ACCOUNT: 4,
    REMOVE_ACCOUNT: 5,
    EDIT_ACCOUNT: 6
  }

  return types;
}
