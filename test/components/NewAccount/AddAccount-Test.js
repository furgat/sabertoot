import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddAccount from '../../../js/components/NewAccount/AddAccount';

describe('component AddAccount', function() {
  beforeEach(function() {
    this.wrapper = shallow(<AddAccount />);
  })

  it ('should render as .add-account', function() {
    expect(this.wrapper.hasClass('add-account')).to.equal(true);
  })

  it ('should contain an .auth-form', function() {
    expect(this.wrapper.find('.auth-form').length).to.equal(1);
  })

  describe('form .auth-form', function() {
    beforeEach(function() {
      this.wrapper = shallow(<AddAccount />).find('.auth-form');
    })

    it ('should contain an .auth-code-label', function() {
      expect(this.wrapper.find('.auth-code-label').length).to.equal(1);
    })

    it ('should contain an .auth-code', function() {
      expect(this.wrapper.find('.auth-code').length).to.equal(1);
    })

    it ('should contain a .submit-auth', function() {
      expect(this.wrapper.find('.submit-auth').length).to.equal(1);
    })

    describe('element .submit-auth', function() {
      beforeEach(function() {
        this.wrapper = shallow(<AddAccount />).find('.auth-form');
        this.accessCode = this.wrapper.find('.access-code');
        this.wrapper = this.wrapper.find('.submit-auth');
      })

      it ('should be .disabled by default', function() {
        expect(this.wrapper.hasClass('disabled')).to.equal(true);
      })

      it ('should be .disabled if .access-code is .invalid')
      it ('should not be .disabled if .access-code is .valid')
    })

    describe('element .auth-code', function() {
      beforeEach(function() {
        this.wrapper = shallow(<AddAccount />).find('.auth-code')
      })

      it ('should have no value by default', function() {
        expect(this.wrapper.node.value).to.not.exist;
      })
      it ('should be .invalid if value is empty')
      it ('should be .invalid if value is not a valid access code')
      it ('should be .valid if value is a valid access code')
    })
  })
})
