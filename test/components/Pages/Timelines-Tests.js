import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Timelines from '../../../js/components/Pages/Timelines';
import Column from '../../../js/components/Timelines/Column';

describe('component Timelines', () => {
  it ('should render as .timelines', () => {
    const wrapper = shallow(<Timelines />);
    expect(wrapper.is('.timelines')).to.equal(true);
  })

  describe('div .timelines', () => {
    it ('should contain .navigation', () => {
      const wrapper = mount(<Timelines />);
      expect(wrapper.find('.navigation').length).to.equal(1);
    })

    it ('should contain .timelines-body', () => {
      const wrapper = shallow(<Timelines />);
      expect(wrapper.find('.timelines-body').length).to.equal(1);
    })

    it ('should render Columns when passed', () => {
      const testCase = [<Column/>, <Column/>, <Column />];
      const wrapper = shallow(<Timelines listColumns={testCase}></Timelines>).find('.timelines-body');
      expect(wrapper.children().length).to.equal(3);
    })
  })
})
