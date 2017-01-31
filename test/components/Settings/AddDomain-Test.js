import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddDomain from '../../../js/components/Settings/AddDomain';

describe('component AddDomain', function() {
  it ('should render as .add_domain', function() {
    const wrapper = shallow(<AddDomain />);
    expect(wrapper.hasClass('add_domain')).to.equal(true);
  })
})
