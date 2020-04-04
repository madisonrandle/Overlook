import chai from 'chai';
import $ from 'jquery';
import domUpdates from '../src/domUpdates';
const expect = chai.expect;


const spies = require('chai-spies');
chai.use(spies);

describe('domUpdates', () => {
// SPIES TEST EXAMPLE
  // chai.spy.on(domUpdates, 'showLogInForm', () => 'login');
    // it('Should invoke showLogInForm', () => {
    //   expect(domUpdates.showLogInForm()).to.equal('login');
    // });
});
