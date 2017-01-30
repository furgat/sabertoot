import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Layout from '../../js/components/Layout';
import Timelines from '../../js/components/Pages/Timelines';

describe('component Layout', () => {
  it ('should render as .layout', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.is('.layout')).to.equal(true);
  })

  it ('should render children when passed', () => {
    const wrapper = shallow(<Layout><Timelines /></Layout>);
    expect(wrapper.children().length).to.equal(1);
  })
})
