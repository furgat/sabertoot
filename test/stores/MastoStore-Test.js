'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import MastoStore from '../../js/stores/MastoStore';
import MastoDispatch from '../../js/dispatchers/MastoDispatch';
import * as MastoActions from '../../js/actions/MastoActions';

describe('store MastoStore', function() {
  /* i don't know how to unit test a store
  beforeEach(function() {
    //this.MastoStore = MastoStore;
    this.registerSpy = sinon.stub(MastoDispatch, 'register');
    this.dispatchSpy = sinon.spy(MastoDispatch, 'dispatch');
    this.MastoStore = require('../../js/stores/MastoStore');
    //MastoDispatch.register(MastoStore.handleActions.bind(MastoStore));
    this.callback = this.registerSpy.lastCall.args[0];

    this.testDomain = {
      name:'test.case', timeout_ms:60*1500, api_url:'https://test.case/api/v1/'
    };
    this.testAccount = {
      name: 'user', domain_name: 'test.case', connection: undefined, columns: [], settings: {}
    };
  })

  afterEach(function() {
    this.registerSpy.restore();
    this.dispatchSpy.restore();
  })

  it ('should register with MastoDispatch', function() {
    expect(this.registerSpy.callCount).to.equal(1);
  })

  it ('should create new domains', function() {
    MastoDispatch.dispatch(MastoActions.createDomain(this.testDomain));
    const wrapper = this.MastoStore.getDomains();
    expect(wrapper).to.include(this.testDomain);
  })

  it ('should remove domains', function() {
    MastoDispatch.dispatch(MastoActions.removeDomain(this.testDomain.name));
    const wrapper = this.MastoStore.getDomains();
    expect(wrapper).to.not.include(this.testDomain);
  })

  it ('should create new accounts', function() {
    MastoDispatch.dispatch(MastoActions.createAccount(this.testAccount));
    const wrapper = this.MastoStore.getAccounts();
    expect(wrapper).to.include(this.testAccount);
  })

  it ('should remove accounts', function() {
    MastoDispatch.dispatch(MastoActions.removeAccount(this.testAccount.name));
    const wrapper = this.MastoStore.getDomains();
    expect(wrapper).to.not.include(this.testAccount);
  })

  it ('should reformat mastodon toot HTML as Card')
  it ('should reformat mastodon profile HTML as Card')
  */
})
