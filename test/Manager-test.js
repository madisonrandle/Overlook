import chai from 'chai';
import Manager from '../src/Manager';
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

  it('should accept an array of all available rooms', () => {
    expect(manager.availableRoomsToday).to.be.a('array');
  });

  it('should accept an array of all occupied rooms', () => {
    expect(manager.occupiedRooms).to.be.a('array');
  });

  it('should return an array of available rooms for today\'s date', () => {
    expect(manager.getAvailableRoomsToday(roomsData.rooms, bookingsData.bookings)).to.deep.eql([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26
      },
      {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39
      },
      {
        number: 10,
        roomType: 'suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 497.64
      },
      {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24
      },
      {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09
      }
    ]);
  });

  it('should calculate the total revenue for today\'s date', () => {
    expect(manager.getTotalRevenueToday(roomsData.rooms, bookingsData.bookings)).to.be.a('string');
    expect(manager.getTotalRevenueToday(roomsData.rooms, bookingsData.bookings)).to.eql('$0.00');
  });

  it('should calculate the percentage of rooms occupied for today\'s date', () => {
    expect(manager.getPercentageOfRoomsOccupiedToday(roomsData.rooms)).to.be.a('number');
    expect(manager.getPercentageOfRoomsOccupiedToday(roomsData.rooms)).to.eql(0);
  });

  // it('should find the user a manager searches for', () => {
  //   let searchedUser = 'Madison Randle';
  //   console.log(manager.getSerachedUser(searchedUser, usersData.users, manager));
  //   // expect(manager.getSerachedUser(searchedUser, usersData.users, manager)).to.be.a('number');
  //
  // });

  // delete booking

});
