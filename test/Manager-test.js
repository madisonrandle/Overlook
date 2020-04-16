import chai from 'chai';
import moment from 'moment';
import Manager from '../src/Manager';
import Customer from '../src/Customer';
import usersData from '../src/test-data/users-test-data';
import roomsData from '../src/test-data/rooms-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
const expect = chai.expect;

let manager;
describe('Manager', () => {
  beforeEach(() => {
    manager = new Manager(usersData, roomsData, bookingsData);
   });

  it('should be a function', () => {
       expect(Manager).to.be.a('function');
   });

  it('should be an instance of Hotel', () => {
   expect(manager).to.be.an.instanceof(Manager);
  });

  // it('should know what today\'s date is', () => {
  //   expect(manager.todaysDate).to.equal(moment().format('YYYY-MM-DD'));
  // });
  //
  // it('should accept an array of all available rooms', () => {
  //   expect(manager.availableRooms).to.be.a('array');
  // });
  //
  // it('should accept an array of all occupied rooms', () => {
  //   expect(manager.occupiedRooms).to.be.a('array');
  // });
  //
  // it('should return an array of available rooms for today\'s date', () => {
  //   expect(manager.getAvailableRoomsToday().length).to.equal(12);
  // });
  //
  // it('should calculate the total revenue for today\'s date', () => {
  //   expect(manager.getTotalRevenueToday()).to.be.a('number');
  // });
  //
  // it('should calculate the percentage of rooms occupied for today\'s date', () => {
  //   expect(manager.getPercentageOfRoomsOccupiedToday()).to.be.a('number');
  // });


});
