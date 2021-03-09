var assert = require('assert');
import { Email } from '../../model/email';
import 'mocha';
import { expect } from 'chai';

describe('Email', function() {
  // Test construct email return correct data
  it('construct', function() {
    let email = new Email(["a","b"], "new subject", "new body");
    expect(email.subject).equal("new subject");
    expect(email.body).equal("new body");
    expect(email.recipients[0]).equal("a");
  }); 
});