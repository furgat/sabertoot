import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddAccount from '../../../js/components/NewAccount/AddAccount';

describe('component AddAccount', function() {
  beforeEach(function() {
    this.wrapper = mount(<AddAccount />);
  })

  afterEach(function() {
    this.wrapper.unmount();
  })

  it ('should render as .add-account', function() {
    expect(this.wrapper.hasClass('add-account')).to.equal(true);
  })

  it ('should contain an .auth-form', function() {
    expect(this.wrapper.find('.auth-form').length).to.equal(1);
  })

  describe('form .auth-form', function() {
    beforeEach(function() {
      this.form = this.wrapper.find('.auth-form');
    })

    it ('should contain an .auth-code-label', function() {
      expect(this.form.find('.auth-code-label').length).to.equal(1);
    })

    it ('should contain an .auth-code', function() {
      expect(this.form.find('.auth-code').length).to.equal(1);
    })

    it ('should contain a .submit-auth', function() {
      expect(this.form.find('.submit-auth').length).to.equal(1);
    })

    describe('element .submit-auth', function() {
      beforeEach(function() {
        this.auth = this.form.find('.auth-code');
        this.submit = this.form.find('.submit-auth');
      })

      it ('should be .disabled by default', function() {
        expect(this.submit.hasClass('disabled')).to.equal(true);
      })

      it ('should be .disabled if .access-code is .invalid', function() {
        const testCase = '';
        this.auth.simulate('change', {target: {value: testCase}});
        expect(this.submit.hasClass('disabled')).to.equal(true);
      })

      it ('should not be .disabled if .access-code is .valid', function() {
        const testCase = '34asdAfdF5624';
        this.auth.simulate('change', {target: {value: testCase}});
        expect(this.submit.hasClass('disabled')).to.equal(false);
      })
    })

    describe('element .auth-code', function() {
      beforeEach(function() {
        this.auth = this.form.find('.auth-code');
      })

      it ('should have no value by default', function() {
        expect(this.auth.node.value).to.equal('');
      })

      it ('should not be .invalid by default', function() {
        expect(this.auth.hasClass('invalid')).to.equal(false);
      })

      it ('should be .invalid if value is changed but empty', function() {
        const testCase = '';
        this.auth.simulate('change', {target: {value: testCase}});
        expect(this.auth.hasClass('invalid')).to.equal(true);
      })

      it ('should be .invalid if value is not a valid access code', function() {
        const testCase = '';
        this.auth.simulate('change', {target: {value: testCase}});
        expect(this.auth.hasClass('invalid')).to.equal(true);
      })

      it ('should be .valid if value is a valid access code', function() {
        const testCase = '4563sdfAAffF43';
        this.auth.simulate('change', {target: {value: testCase}});
        expect(this.auth.hasClass('valid')).to.equal(true);
      })
    })
  })
})
