import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Layout from '../js/components/Layout';

describe('component Layout', () => {
  it ('should have a className called layout', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.is('.layout')).to.equal(true);
  })

  it ('should have two children', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.children().length).to.equal(2);
  })
})
