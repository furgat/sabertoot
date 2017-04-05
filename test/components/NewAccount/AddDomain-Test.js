import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import AddDomain from '../../../js/components/NewAccount/AddDomain';

describe('component AddDomain', function() {
  beforeEach(function() {
    this.wrapper = mount(<AddDomain />);
  })

  afterEach(function() {
    this.wrapper.unmount();
  })

  it ('should render as .add-domain', function() {
    expect(this.wrapper.hasClass('add-domain')).to.equal(true);
  })

  it ('should contain an .domain-form', function() {
    expect(this.wrapper.find('.domain-form').length).to.equal(1);
  })

  describe('form .account-form', function() {
    beforeEach(function() {
      this.form = this.wrapper.find('.domain-form');
    })

    it ('should contain an .account-name-label', function() {
      expect(this.form.find('.account-name-label').length).to.equal(1);
    })

    it ('should contain an .account-name', function() {
      expect(this.form.find('.account-name').length).to.equal(1);
    })

    it ('should contain a .domain-selector-label', function() {
      expect(this.form.find('.domain-selector-label').length).to.equal(1);
    })

    it ('should contain a .domain-selector', function() {
      expect(this.form.find('.domain-selector').length).to.equal(1);
    })

    it ('should contain an .add-toggle', function() {
      expect(this.form.find('.add-toggle').length).to.equal(1);
    })

    it ('should contain a .submit-button', function() {
      expect(this.form.find('.submit-button').length).to.equal(1);
    })

    it ('should contain a .new-domain-form', function() {
      expect(this.form.find('.new-domain-form').length).to.equal(1);
    })

    describe('element .account-name', function() {
      beforeEach(function() {
        this.name = this.form.find('.account-name');
      })

      it ('should not be .invalid by default', function() {
        expect(this.name.hasClass('invalid')).to.equal(false);
      })

      it ('should be .invalid if value is changed but empty', function() {
        const testCase = '';
        this.name.simulate('change', {target: {value: testCase}});
        expect(this.name.hasClass('invalid')).to.equal(true);

      })

      it ('should be .invalid if value is not a valid username', function() {
        const testCase = '<BadUsername/>seriously://unsafe;';
        this.name.simulate('change', {target: {value: testCase}});
        expect(this.name.hasClass('invalid')).to.equal(true);
      })

      it ('should be .valid if value is a valid username', function() {
        const testCase = 'username';
        this.name.simulate('change', {target: {value: testCase}});
        expect(this.name.hasClass('valid')).to.equal(true);
      })
    })

    describe('element .domain-selector', function() {
      beforeEach(function() {
        this.sel = this.form.find('.domain-selector');
        this.addToggle = this.form.find('.add-toggle');
      })

      it ('should not be .disabled by default', function() {
        expect(this.sel.hasClass('disabled')).to.equal(false);
      })

      it ('should be .disabled after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.sel.hasClass('disabled')).to.equal(true);
      })

      it ('should not be .disabled after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.sel.hasClass('disabled')).to.equal(false);
      })
    })

    describe('element .add-toggle', function() {
      beforeEach(function() {
        this.addToggle = this.form.find('.add-toggle');
      })

      it ('should have .plus by default', function() {
        expect(this.addToggle.hasClass('plus')).to.equal(true);
      })

      it ('should have .minus after being clicked', function() {
        this.addToggle.simulate('click');
        expect(this.addToggle.hasClass('minus')).to.equal(true);
      })

      it ('should have .plus after being clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.addToggle.hasClass('plus')).to.equal(true);
      })
    })

    describe('element .submit-button', function() {
      beforeEach(function() {
        this.submit = this.form.find('.submit-button');
        this.addToggle = this.form.find('.add-toggle')
      })

      it ('should be .disabled by default', function() {
        expect(this.submit.hasClass('disabled')).to.equal(true);
      })

      it ('should be .disabled after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.submit.hasClass('disabled')).to.equal(true);
      })

      it ('should not be .disabled after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.submit.hasClass('disabled')).to.equal(false);
      })
    })

    describe('form .new-domain-form', function() {
      beforeEach(function() {
        this.new_form = this.form.find('.new-domain-form');
        this.addToggle = this.form.find('.add-toggle');
      })

      it ('should contain a .new-domain-name-label', function() {
        expect(this.new_form.find('.new-domain-name-label').length).to.equal(1);
      })

      it ('should contain a .new-domain-name', function() {
        expect(this.new_form.find('.new-domain-name').length).to.equal(1);
      })

      it ('should contain a .new-domain-api-label', function() {
        expect(this.new_form.find('.new-domain-api-label').length).to.equal(1);
      })

      it ('should contain a .new-domain-api', function() {
        expect(this.new_form.find('.new-domain-api').length).to.equal(1);
      })

      it ('should contain a .submit-new-domain', function() {
        expect(this.new_form.find('.submit-new-domain').length).to.equal(1);
      })

      it ('should be .hidden by default', function() {
        expect(this.new_form.hasClass('hidden')).to.equal(true);
      })

      it ('should not be .hidden after .add-toggle is clicked', function() {
        this.addToggle.simulate('click');
        expect(this.new_form.hasClass('hidden')).to.equal(false);
      })

      it ('should be .hidden after .add-toggle is clicked twice', function() {
        for (var i in [0,1])
          this.addToggle.simulate('click');
        expect(this.new_form.hasClass('hidden')).to.equal(true);
      })

      describe('element .new-domain-name', function() {
        beforeEach(function() {
            this.dname = this.new_form.find('.new-domain-name')
        })

        it ('should have no value by default', function() {
          expect(this.dname.node.value).to.equal('');
        })

        it ('should not be .invalid by default', function() {
          expect(this.dname.hasClass('invalid')).to.equal(false)
        })

        it ('should be .invalid if value is changed but empty', function() {
          const testCase = '';
          this.dname.simulate('change', {target: {value: testCase}});
          expect(this.dname.hasClass('invalid')).to.equal(true);
        })

        it ('should be .invalid if value is not a valid domain name', function() {
          const testCase = '';
          this.dname.simulate('change', {target: {value: testCase}});
          expect(this.dname.hasClass('invalid')).to.equal(true);
        })

        it ('should be .valid if value is a valid domain name', function() {
          const testCase = 'domainn.ame';
          this.dname.simulate('change', {target: {value: testCase}});
          expect(this.dname.hasClass('invalid')).to.equal(true);
        })
      })

      describe('element .new-domain-api', function() {
        beforeEach(function() {
            this.dapi = this.new_form.find('.new-domain-api')
        })

        it ('should have no value by default', function() {
          expect(this.dapi.node.value).to.equal('');
        })

        it ('should not be .invalid by default', function() {
          expect(this.dapi.hasClass('invalid')).to.equal(false)
        })

        it ('should be .invalid if value is changed but empty', function() {
          const testCase = '';
          this.dapi.simulate('change', {target: {value: testCase}});
          expect(this.dapi.hasClass('invalid')).to.equal(true);
        })

        it ('should be .invalid if value is not a valid url', function() {
          const testCase = 'fake.notaurl';
          this.dapi.simulate('change', {target: {value: testCase}});
          expect(this.dapi.hasClass('invalid')).to.equal(true);
        })

        it ('should be .valid if value is a valid url', function() {
          const testCase = 'https://test.case/';
          this.dapi.simulate('change', {target: {value: testCase}});
          expect(this.dapi.hasClass('valid')).to.equal(true);
        })
      })

      describe('element .submit-new-domain', function() {
        beforeEach(function() {
          this.submit = this.new_form.find('.submit-new-domain');
          this.newDomainName = this.new_form.find('.new-domain-name');
          this.newDomainApi = this.new_form.find('.new-domain-api');
        })

        it ('should be .disabled by default', function() {
          expect(this.submit.hasClass('disabled')).to.equal(true);
        })

        it ('should be .disabled if .new-domain-api is .invalid', function() {
          const testCase = 'nota.url';
          this.newDomainApi.simulate('change', {target: {value: testCase}});
          expect(this.submit.hasClass('disabled')).to.equal(true);
        })

        it ('should be .disabled if .new-domain-api neither .valid nor .invalid', function() {
          const testCase = '';
          this.newDomainApi.simulate('change', {target: {value: testCase}});
          expect(this.submit.hasClass('disabled')).to.equal(true);
        })

        it ('should not be .disabled if .new-domain-api and .new-domain-name are both .valid', function() {
          const testCase = {domainName: 'domain', domainApi:'https://test.case/'};
          this.newDomainName.simulate('change', {target: {value: testCase.domainName}})
          this.newDomainApi.simulate('change', {target: {value: testCase.domainApi}});
          expect(this.submit.hasClass('disabled')).to.equal(false);
        })
      })
    })
  })
})
