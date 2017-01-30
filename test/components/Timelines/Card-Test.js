import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Card from '../../../js/components/Timelines/Card';

describe('component Card', () => {
  it ('should render as .card', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.is('.card')).to.equal(true);
  })

  describe('div .card', () => {
    it ('should contain .card-header', () => {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.card-header')).to.have.length(1);
    })

    it ('should contain .user-icon', () => {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.user-icon')).to.have.length(1);
    })

    it ('should contain .card-body', () => {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.card-body')).to.have.length(1);
    })
  })

  describe('div .card-header', () => {
    it ('should render text when passed', () => {
      const testCase = 'some test text';
      const wrapper = shallow(<Card cardHeader={testCase} />);
      expect(wrapper.find('.card-header').text()).to.equal(testCase);
    })
  })

  describe('div .user-icon', () => {
    it ('should contain an anchor containing an image', () => {
      const wrapper = shallow(<Card />).find('.user-icon');
      expect(wrapper.find('a').find('img').length).to.equal(1);
    })

    it ('should link to the userUrl', () => {
      const testCase = 'someUserUrl';
      const wrapper = shallow(<Card userUrl={testCase} />).find('.user-icon');
      expect(wrapper.find('a').prop('href')).to.equal(testCase);
    })

    it ('should render the image passed', () => {
      const testCase = 'someImage';
      const wrapper = shallow(<Card userIcon={testCase} />).find('.user-icon');
      expect(wrapper.find('img').prop('src')).to.equal(testCase);
    })

    it ('should render the userName as alt text', () => {
      const testCase = 'someUserName';
      const wrapper = shallow(<Card userName={testCase} />).find('.user-icon');
      expect(wrapper.find('img').prop('alt')).to.equal(testCase);
    })

    it ('should fall back to a default image if none passed', () => {
      const wrapper = shallow(<Card />).find('.user-icon');
      expect(wrapper.find('img').prop('src')).to.not.be.empty;
    })
  })

  describe('div .card-body', () => {
    it ('should contain .card-msg-header', () => {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-msg-header')).to.have.length(1);
    })

    it ('should contain .card-msg', () => {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-msg')).to.have.length(1);
    })

    it ('should contain .card-actions', () => {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-actions')).to.have.length(1);
    })
  })

  describe('div .card-msg-header', () => {
    it ('should contain .names', () => {
      const wrapper = shallow(<Card />).find('.card-msg-header');
      expect(wrapper.find('.names')).to.have.length(1);
    })

    it ('should contain .timestamp', () => {
      const wrapper = shallow(<Card />).find('.card-msg-header');
      expect(wrapper.find('.timestamp')).to.have.length(1);
    })
  })

  describe('div .names', () => {
    it ('should contain .display-name', () => {
      const wrapper = shallow(<Card />).find('.names');
      expect(wrapper.find('.display-name')).to.have.length(1);
    })

    it ('should contain .user-name', () => {
      const wrapper = shallow(<Card />).find('.names');
      expect(wrapper.find('.user-name')).to.have.length(1);
    })
  })

  describe('div .display-name', () => {
    it ('should render text when passed', () => {
      const testCase = 'SomeUser';
      const wrapper = shallow(<Card displayName={testCase}/>);
      expect(wrapper.find('.user-icon').find('img').length).to.equal(1);
    })
  })

  describe('div .user-name', () => {
    it ('should render text when passed', () => {
      const testCase = '@username';
      const wrapper = shallow(<Card userName={testCase}/>);
      expect(wrapper.find('.user-name').text()).to.equal(testCase);
    })
  })

  describe('div .timestamp', () => {
    it ('should render text when passed', () => {
      const testCase = 'some timestamp';
      const wrapper = shallow(<Card timeStamp={testCase}/>);
      expect(wrapper.find('.timestamp').text()).to.equal(testCase);
    })
  })

  describe('div .card-msg', () => {
    it ('should render text when passed', () => {
      const testCase = 'some message';
      const wrapper = shallow(<Card cardMsg={testCase}/>);
      expect(wrapper.find('.card-msg').text()).to.equal(testCase);
    })
  })

  describe('div .card-actions', () => {
    it ('should contain one .reply-button', () => {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.reply-button')).to.have.length(1);
    })

    it ('should contain one .boost-button', () => {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.boost-button')).to.have.length(1);
    })

    it ('should contain one .fav-button', () => {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.fav-button')).to.have.length(1);
    })

    it ('should contain one .options-button', () => {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.options-button')).to.have.length(1);
    })
  })
})
