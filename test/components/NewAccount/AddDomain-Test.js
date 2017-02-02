import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddDomain from '../../../js/components/NewAccount/AddDomain';

describe('component AddDomain', function() {
  beforeEach(function() {
    this.wrapper = shallow(<AddDomain />);
  })

  it ('should render as .add-domain', function() {
    expect(this.wrapper.hasClass('add-domain')).to.equal(true);
  })

  it ('should contain an .domain-form', function() {
    expect(this.wrapper.find('.domain-form').length).to.equal(1);
  })

  describe('form .account-form', function() {
    beforeEach(function() {
      this.wrapper = shallow(<AddDomain />).find('.domain-form');
    })

    it ('should contain an .account-name-label', function() {
      expect(this.wrapper.find('.account-name-label').length).to.equal(1);
    })

    it ('should contain an .account-name', function() {
      expect(this.wrapper.find('.account-name').length).to.equal(1);
    })

    it ('should contain a .domain-selector-label', function() {
      expect(this.wrapper.find('.domain-selector-label').length).to.equal(1);
    })

    it ('should contain a .domain-selector', function() {
      expect(this.wrapper.find('.domain-selector').length).to.equal(1);
    })

    it ('should contain an .add-toggle', function() {
      expect(this.wrapper.find('.add-toggle').length).to.equal(1);
    })

    it ('should contain a .submit-button', function() {
      expect(this.wrapper.find('.submit-button').length).to.equal(1);
    })

    it ('should contain a .new-domain-form', function() {
      expect(this.wrapper.find('.new-domain-form').length).to.equal(1);
    })

    describe('element .account-name', function() {
      beforeEach(function() {
        this.wrapper = shallow(<AddDomain />).find('.account-name');
      })

      it ('should not be .invalid by default', function() {
        expect(this.wrapper.hasClass('invalid')).to.equal(false);
      })

      it ('should be .invalid if value is not a valid username')
      it ('should be .valid if value is a valid username')
    })

    describe('element .domain-selector', function() {
      beforeEach(function() {
        this.wrapper = mount(<AddDomain />).find('.domain-selector');
        this.addToggle = this.wrapper.parent().find('.add-toggle');
      })

      it ('should not be .disabled by default', function() {
        expect(this.wrapper.hasClass('disabled')).to.equal(false);
      })

      it ('should be .disabled after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('disabled')).to.equal(true);
      })

      it ('should not be .disabled after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('disabled')).to.equal(false);
      })
    })

    describe('element .add-toggle', function() {
      beforeEach(function() {
        this.wrapper = mount(<AddDomain />).find('.add-toggle');
      })

      it ('should have .plus by default', function() {
        expect(this.wrapper.hasClass('plus')).to.equal(true);
      })

      it ('should have .minus after being clicked', function() {
        this.wrapper.simulate('click');
        expect(this.wrapper.hasClass('minus')).to.equal(true);
      })

      it ('should have .plus after being clicked twice', function() {
        for (var i in [0,1])
          this.wrapper.simulate('click');
        expect(this.wrapper.hasClass('plus')).to.equal(true);
      })
    })

    describe('element .submit-button', function() {
      beforeEach(function() {
        this.wrapper = mount(<AddDomain />).find('.submit-button');
        this.addToggle = this.wrapper.parent().find('.add-toggle')
      })

      it ('should not be .disabled by default', function() {
        expect(this.wrapper.hasClass('disabled')).to.equal(false);
      })

      it ('should be .disabled after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('disabled')).to.equal(true);
      })

      it ('should not be .disabled after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('disabled')).to.equal(false);
      })
    })

    describe('form .new-domain-form', function() {
      beforeEach(function() {
        this.wrapper = mount(<AddDomain />).find('.new-domain-form');
        this.addToggle = this.wrapper.parent().find('.add-toggle');
      })

      it ('should contain a .new-domain-name-label', function() {
        expect(this.wrapper.find('.new-domain-name-label').length).to.equal(1);
      })

      it ('should contain a .new-domain-name', function() {
        expect(this.wrapper.find('.new-domain-name').length).to.equal(1);
      })

      it ('should contain a .new-domain-api-label', function() {
        expect(this.wrapper.find('.new-domain-api-label').length).to.equal(1);
      })

      it ('should contain a .new-domain-api', function() {
        expect(this.wrapper.find('.new-domain-api').length).to.equal(1);
      })

      it ('should contain a .submit-new-domain', function() {
        expect(this.wrapper.find('.submit-new-domain').length).to.equal(1);
      })

      it ('should be .hidden by default', function() {
        expect(this.wrapper.hasClass('hidden')).to.equal(true);
      })

      it ('should not be .hidden after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('hidden')).to.equal(false);
      })

      it ('should be .hidden after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.wrapper.hasClass('hidden')).to.equal(true);
      })

      describe('element .new-domain-api', function() {
        beforeEach(function() {
            this.wrapper = shallow(<AddDomain />).find('.new-domain-api')
        })

        it ('should have no value by default')
        it ('should not be .invalid by default')
        it ('should be .invalid if value is not a valid url')
        it ('should be .valid if value is a valid url')
      })

      describe('element .submit-new-domain', function() {
        beforeEach(function() {
          this.wrapper = shallow(<AddDomain />).find('.new-domain-form');
          this.addToggle = this.wrapper.parent().find('.add-toggle');
        })

        it ('should be .disabled by default', function() {
          expect(this.wrapper.find('.submit-new-domain').hasClass('disabled')).to.equal(true);
        })

        it ('should not be .disabled after .add-toggle is clicked', function() {
          this.addToggle.simulate('click');
          expect(this.wrapper.find('.submit-new-domain').hasClass('disabled')).to.equal(true);
        })

        it ('should be .disabled after .add-toggle is clicked twice', function() {
          for (var i in [0,1])
            this.addToggle.simulate('click');
          expect(this.wrapper.find('.submit-new-domain').hasClass('disabled')).to.equal(true);
        })
      })
    })
  })
})
