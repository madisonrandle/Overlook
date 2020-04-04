import chai from 'chai';
import Manager from '../src/Manager';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;

let manager;
describe('Manager', () => {
  beforeEach(() => {
    manager = new Manager();
   });

  it('should be a function', function() {
       expect(Manager).to.be.a('function');
   });

  it('should be an instance of Hotel', function() {
   expect(manager).to.be.an.instanceof(Manager);
  });
});
