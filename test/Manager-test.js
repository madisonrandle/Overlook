import chai from 'chai';
import moment from 'moment';
import Manager from '../src/Manager';
import usersData from '../src/test-data/users-test-data';
import roomsData from '../src/test-data/rooms-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
const expect = chai.expect;

let manager;
describe.only('Manager', () => {
  beforeEach(() => {
    manager = new Manager(usersData, roomsData, bookingsData);
   });

  it('should be a function', () => {
       expect(Manager).to.be.a('function');
   });

  it('should be an instance of Hotel', () => {
   expect(manager).to.be.an.instanceof(Manager);
  });

  it('should know what today\'s date is', () => {
    expect(manager.todaysDate).to.equal(moment().format('YYYY-MM-DD'));
  });

  it('should accept an array of all available rooms', () => {
    expect(manager.availableRooms).to.be.a('array');
  });

  it('should accept an array of all occupied rooms', () => {
    expect(manager.occupiedRooms).to.be.a('array');
  });

  it('should return an array of available rooms for today\'s date', () => {
    expect(manager.getAvailableRoomsToday()).to.be.a('array');
  });


});
