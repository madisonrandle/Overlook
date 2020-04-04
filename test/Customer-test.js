import chai from 'chai';
import Customer from '../src/Customer';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;

let customer;
describe('Customer', () => {
  beforeEach(() => {
    customer = new Customer();
   });

  it('should be a function', function() {
       expect(Customer).to.be.a('function');
   });

  it('should be an instance of Hotel', function() {
   expect(customer).to.be.an.instanceof(Customer);
  });
});
