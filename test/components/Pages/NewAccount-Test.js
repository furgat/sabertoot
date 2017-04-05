'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import NewAccount from '../../../js/components/Pages/NewAccount';
import AddDomain from '../../../js/components/NewAccount/AddDomain';
import AddAccount from '../../../js/components/NewAccount/AddAccount';

describe('page NewAccount', function() {
  it ('should render as .new-account', function() {
    const wrapper = shallow(<NewAccount />);
    expect(wrapper.hasClass('new-account')).to.equal(true);
  })

  it ('should render AddAccount as child', function() {
    const wrapper = shallow(<NewAccount><AddAccount /></NewAccount>);
    expect(wrapper.children().length).to.equal(1);
  })

  it ('should render AddDomain as child', function() {
    const wrapper = shallow(<NewAccount><AddAccount /></NewAccount>);
    expect(wrapper.children().length).to.equal(1);
  })
})
