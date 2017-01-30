import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Timelines from '../../../js/components/Pages/Timelines';
import Column from '../../../js/components/Timelines/Column';

describe('component Timelines', () => {
  it ('should render as .timelines', () => {
    const wrapper = mount(<Timelines />);
    expect(wrapper.hasClass('timelines')).to.equal(true);
  })

  it ('should mount', () => {
    sinon.spy(Timelines.prototype, 'componentWillMount');
    const wrapper = mount(<Timelines />);
    expect(Timelines.prototype.componentWillMount.calledOnce).to.equal(true);
    Timelines.prototype.componentWillMount.restore();
  })

  describe('div .timelines', () => {
    it ('should contain .navigation', () => {
      const wrapper = mount(<Timelines />);
      expect(wrapper.find('.navigation').length).to.equal(1);
    })

    it ('should contain .timelines-body', () => {
      const wrapper = mount(<Timelines />);
      expect(wrapper.find('.timelines-body').length).to.equal(1);
    })

    it ('should render Columns from store')
  })
})
