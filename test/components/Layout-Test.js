import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Layout from '../../js/components/Layout';
import Timelines from '../../js/components/Pages/Timelines';

describe('component Layout', function() {
  it ('should render as .layout', function() {
    const wrapper = shallow(<Layout />);
    expect(wrapper.hasClass('layout')).to.equal(true);
  })

  it ('should render children when passed', function() {
    const wrapper = shallow(<Layout><Timelines /></Layout>);
    expect(wrapper.children().length).to.equal(1);
  })
})
