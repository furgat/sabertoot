import React from 'react';
import {EventEmitter} from 'events';

import dispatcher from '../dispatchers/MastoDispatch';

import Card from '../components/Timelines/Card';
import Column from '../components/Timelines/Column';

class MastoStore extends EventEmitter {
  constructor() {
    super();
    this.columns = {
      home: {
        columnHeader: 'Home',
        listCards: [
          <Card
            key='uniquekey'
            userIcon='http://www.conservationdecoys.com/images/deer-decoy1.jpg'
            userUrl=''
            userName='@username'
            displayName='Display Name'
            timeStamp='11/44/23'
            cardMsg='this is a test home toot card'
            cardType='toot'
          />
        ]
      },
      notes: {
        columnHeader: 'Notes',
        listCards: [
          <Card
            key='uniqueley'
            userIcon='http://www.conservationdecoys.com/images/deer-decoy1.jpg'
            userUrl=''
            userName='@username'
            displayName='Display Name'
            timeStamp='75/34/55'
            cardMsg='this is a test note card'
            cardType='note'
            cardHeader='Display Name favorited your Toot!'
          />
        ]
      },
      fediverse: {
        columnHeader: 'Fediverse',
        listCards: [
          <Card
            key='uniquebey'
            userIcon='http://www.conservationdecoys.com/images/deer-decoy1.jpg'
            userUrl=''
            userName='@username'
            displayName='Display Name'
            timeStamp='55/15/85'
            cardMsg='this is a test fediverse toot card'
            cardType='toot'
          />
        ]
      }
    }
  }

  updateTimelines() {
    //TODO: update timelines
    this.emit('update');
  }

  makeColumn(k, header, cards) {
    return (<Column key={k} columnHeader={header} listCards={cards} />);
  }

  getHomeTimeline() {
    const {columnHeader, listCards} = this.columns.home;
    return this.makeColumn('home', columnHeader, listCards);
  }

  getNoteTimeline() {
    const {columnHeader, listCards} = this.columns.notes;
    return this.makeColumn('notes', columnHeader, listCards);
  }

  getFediverseTimeline() {
    const {columnHeader, listCards} = this.columns.fediverse;
    return this.makeColumn('fediverse', columnHeader, listCards);
  }

  handleActions(action) {
    //TODO: handle actions
    switch(action.type) {
      case 'UPDATE_TIMELINES':
        this.updateTimelines.bind(this);
        break;
      default:
        break;
    }
  }
}

const mastoStore = new MastoStore();
dispatcher.register(mastoStore.handleActions.bind(mastoStore));
//window.mastoStore = mastoStore;
export default mastoStore;
