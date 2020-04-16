import chai from 'chai';
import Customer from '../src/Customer';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;

let customer;
describe('Customer', () => {
  beforeEach(() => {
    customer = new Customer(usersData.users[0], false);
   });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
   });

  it('should be an instance of Hotel', () => {
   expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer.id).to.be.a('number');
    expect(customer.id).to.eql(1);
  });

  it('should have a name', () => {
    expect(customer.name).to.be.a('string');
    expect(customer.name).to.eql('Leatha Ullrich');
  });

  it('should not be considered to have manager status', () => {
    expect(customer.isManager).to.be.a('boolean');
    expect(customer.isManager).to.eql(false);
  });
});
