import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddAccount from '../../../js/components/Settings/AddAccount';

describe('component AddAccount', function() {
  it ('should render as .add_account', function() {
    const wrapper = shallow(<AddAccount />);
    expect(wrapper.hasClass('add_account')).to.equal(true);
  })
})
