import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Navigation from '../../../js/components/Timelines/Navigation';

describe('component Navigation', () => {
  it ('should render as .navigation', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.hasClass('navigation')).to.equal(true);
  })

  describe('div .navigation', () => {
    it ('should contain a .user-button', () => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('.user-button')).to.have.length(1);
    })

    it ('should contain a .toot-button', () => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('.user-button')).to.have.length(1);
    })

    it ('should contain a .settings-button', () => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('.user-button')).to.have.length(1);
    })
  })
})
