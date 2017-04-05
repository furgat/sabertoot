import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Card from '../../../js/components/Timelines/Card';

describe('component Card', function() {
  it ('should render as .card', function() {
    const wrapper = shallow(<Card />);
    expect(wrapper.hasClass('card')).to.equal(true);
  })

  it ('should render as .card-toot if cardType is toot', function() {
    const wrapper = shallow(<Card cardType='toot'/>);
    expect(wrapper.hasClass('card-toot')).to.equal(true);
  })

  it ('should render as .card-note if cardType is note', function() {
    const wrapper = shallow(<Card cardType='note'/>);
    expect(wrapper.hasClass('card-note')).to.equal(true);
  })

  describe('div .card', function() {
    it ('should contain .card-header', function() {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.card-header')).to.have.length(1);
    })

    it ('should contain .user-icon', function() {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.user-icon')).to.have.length(1);
    })

    it ('should contain .card-body', function() {
      const wrapper = shallow(<Card />).find('.card');
      expect(wrapper.find('.card-body')).to.have.length(1);
    })
  })

  describe('div .card-header', function() {
    it ('should render text when passed', function() {
      const testCase = 'some test text';
      const wrapper = shallow(<Card cardHeader={testCase} />);
      expect(wrapper.find('.card-header').text()).to.equal(testCase);
    })
  })

  describe('div .user-icon', function() {
    it ('should contain an anchor containing an image', function() {
      const wrapper = shallow(<Card />).find('.user-icon');
      expect(wrapper.find('a').find('img').length).to.equal(1);
    })

    it ('should link to the userUrl', function() {
      const testCase = 'someUserUrl';
      const wrapper = shallow(<Card userUrl={testCase} />).find('.user-icon');
      expect(wrapper.find('a').prop('href')).to.equal(testCase);
    })

    it ('should render the image passed', function() {
      const testCase = 'someImage';
      const wrapper = shallow(<Card userIcon={testCase} />).find('.user-icon');
      expect(wrapper.find('img').prop('src')).to.equal(testCase);
    })

    it ('should render the userName as alt text', function() {
      const testCase = 'someUserName';
      const wrapper = shallow(<Card userName={testCase} />).find('.user-icon');
      expect(wrapper.find('img').prop('alt')).to.equal(testCase);
    })

    it ('should fall back to a default image if none passed', function() {
      const wrapper = shallow(<Card />).find('.user-icon');
      expect(wrapper.find('img').prop('src')).to.not.be.empty;
    })
  })

  describe('div .card-body', function() {
    it ('should contain .card-msg-header', function() {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-msg-header')).to.have.length(1);
    })

    it ('should contain .card-msg', function() {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-msg')).to.have.length(1);
    })

    it ('should contain .card-actions', function() {
      const wrapper = shallow(<Card />).find('.card-body');
      expect(wrapper.find('.card-actions')).to.have.length(1);
    })
  })

  describe('div .card-msg-header', function() {
    it ('should contain .names', function() {
      const wrapper = shallow(<Card />).find('.card-msg-header');
      expect(wrapper.find('.names')).to.have.length(1);
    })

    it ('should contain .timestamp', function() {
      const wrapper = shallow(<Card />).find('.card-msg-header');
      expect(wrapper.find('.timestamp')).to.have.length(1);
    })
  })

  describe('div .names', function() {
    it ('should contain .display-name', function() {
      const wrapper = shallow(<Card />).find('.names');
      expect(wrapper.find('.display-name')).to.have.length(1);
    })

    it ('should contain .user-name', function() {
      const wrapper = shallow(<Card />).find('.names');
      expect(wrapper.find('.user-name')).to.have.length(1);
    })
  })

  describe('div .display-name', function() {
    it ('should render text when passed', function() {
      const testCase = 'SomeUser';
      const wrapper = shallow(<Card displayName={testCase}/>);
      expect(wrapper.find('.user-icon').find('img').length).to.equal(1);
    })
  })

  describe('div .user-name', function() {
    it ('should render text when passed', function() {
      const testCase = '@username';
      const wrapper = shallow(<Card userName={testCase}/>);
      expect(wrapper.find('.user-name').text()).to.equal(testCase);
    })
  })

  describe('div .timestamp', function() {
    it ('should render text when passed', function() {
      const testCase = 'some timestamp';
      const wrapper = shallow(<Card timeStamp={testCase}/>);
      expect(wrapper.find('.timestamp').text()).to.equal(testCase);
    })
  })

  describe('div .card-msg', function() {
    it ('should render text when passed', function() {
      const testCase = 'some message';
      const wrapper = mount(<Card cardMsg={testCase}/>);
      expect(wrapper.find('.card-msg').text()).to.equal(testCase);
      wrapper.unmount();
    })
  })

  describe('div .card-actions', function() {
    it ('should contain one .reply-button', function() {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.reply-button')).to.have.length(1);
    })

    it ('should contain one .boost-button', function() {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.boost-button')).to.have.length(1);
    })

    it ('should contain one .fav-button', function() {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.fav-button')).to.have.length(1);
    })

    it ('should contain one .options-button', function() {
      const wrapper = shallow(<Card />).find('.card-actions');
      expect(wrapper.find('.options-button')).to.have.length(1);
    })
  })
})
