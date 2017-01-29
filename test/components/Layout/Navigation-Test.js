import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Navigation from '../../../js/components/Layout/Navigation';

describe('component Navigation', () => {
  it ('should have a className called navigation', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.is('.navigation')).to.equal(true);
  })
})
