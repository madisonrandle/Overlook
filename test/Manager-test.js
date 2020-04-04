import chai from 'chai';
import Manager from '../src/Manager';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;

let manager;
describe.only('Manager', () => {
  beforeEach(() => {
    manager = new Manager();
   });

  it('should be a function', () => {
       expect(Manager).to.be.a('function');
   });

  it('should be an instance of Hotel', () => {
   expect(manager).to.be.an.instanceof(Manager);
  });

  it('should accept the total rooms available', () => {
    expect(manager.availableRooms).to.be.a('array');
  });

  it('should accept the total rooms occupied', () => {
    expect(manager.occupiedRooms).to.be.a('array');
  })
});
