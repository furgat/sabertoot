'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Column from '../../../js/components/Timelines/Column';
import Card from '../../../js/components/Timelines/Card';

describe('component Column', function() {
  it ('should render as .column', function() {
    const wrapper = shallow(<Column />);
    expect(wrapper.hasClass('column')).to.equal(true);
  })

  describe('div .column', function() {
    it ('should contain a .column-header', function() {
      const wrapper = shallow(<Column />);
      expect(wrapper.find('.column-header').length).to.equal(1);
    })

    it ('should contain a .column-body', function() {
      const wrapper = shallow(<Column />);
      expect(wrapper.find('.column-body').length).to.equal(1);
    })

    it ('should render Cards when passed', function() {
      const testCase = '[{"id":1234},{"id":3245},{"id":5634}]';
      const wrapper = mount(<Column listCards={testCase} />);
      expect(wrapper.find('.column-body').children().length).to.equal(3);
      wrapper.unmount();
    })
  })

  describe('div .column-header', function() {
    it ('should render text when passed', function() {
      const testCase = 'some Header';
      const wrapper = shallow(<Column columnHeader={testCase} />).find('.column-header');
      expect(wrapper.text()).to.equal(testCase);
    })
  })
})
