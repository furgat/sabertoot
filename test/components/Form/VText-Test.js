'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import VText from '../../../js/components/Form/VText';

describe('component VText', function() {
  beforeEach(function() {
    this.callback = sinon.spy();
    this.wrapper = mount(
      <VText
        className="someclass"
        invalidClass="invalid"
        validClass="valid"
        regex={/^[a-z0-9_-]{3,25}$/}
        changeCallback={this.callback}
      />
    );
  });

  afterEach(function() {
    this.wrapper.unmount();
  });

  it('should render an input of type text', function() {
    expect(this.wrapper.find('input[type="text"]').length).to.equal(1);
  });

  it('should render the className passed in', function() {
    expect(this.wrapper.hasClass('someclass')).to.equal(true);
  });

  it('should return a boolean for getState()', function() {
    expect(this.wrapper.node.getState()).to.equal(false);
  })

  it('should fire a changeCallback onChange', function() {
    this.wrapper.simulate('change', {target:{value:''}});
    expect(this.callback.called).to.equal(true);
  })

  it('should render the invalidClass on bad input', function() {
    this.wrapper.simulate('change', {target:{value:''}});
    expect(this.wrapper.hasClass('invalid')).to.equal(true);
    this.wrapper.simulate('change', {target:{value:'as'}});
    expect(this.wrapper.hasClass('invalid')).to.equal(true);
    this.wrapper.simulate('change', {target:{value:'asdfwerfasfaewrj23hi4toy0as9dufhoaigluashdf23o4lasdf'}});
    expect(this.wrapper.hasClass('invalid')).to.equal(true);
  });

  it('should render the validClass on good input', function() {
    this.wrapper.simulate('change', {target:{value:'fakename123'}});
    expect(this.wrapper.hasClass('valid')).to.equal(true);
  });
});
