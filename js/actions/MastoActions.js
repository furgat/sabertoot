import dispatcher from '../dispatchers/MastoDispatch';

export function updateTimelines() {
  dispatcher.dispatch({type:'UPDATE_TIMELINES'});
}

// ...
