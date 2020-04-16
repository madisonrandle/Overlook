import chai from 'chai';
import Customer from '../src/Customer';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;

let customer;
describe('Customer', () => {
  beforeEach(() => {
    customer = new Customer(usersData.users[8], false);
   });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
   });

  it('should be an instance of Hotel', () => {
   expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer.id).to.be.a('number');
    expect(customer.id).to.eql(9);
  });

  it('should have a name', () => {
    expect(customer.name).to.be.a('string');
    expect(customer.name).to.eql('Faustino Quitzon');
  });

  it('should not be considered to have manager status', () => {
    expect(customer.isManager).to.be.a('boolean');
    expect(customer.isManager).to.eql(false);
  });

  it('should find all room bookings made past, present, and future', () => {
    expect(customer.getAllBookings(bookingsData.bookings).length).to.eql(4);
    expect(customer.getAllBookings(bookingsData.bookings)).to.deep.eql([bookingsData.bookings[8], bookingsData.bookings[9], bookingsData.bookings[10], bookingsData.bookings[11]]);
  });
});
