import chai from 'chai';
import moment from 'moment';
import Hotel from '../src/Hotel'
import usersData from '../src/test-data/users-test-data';
import roomsData from '../src/test-data/rooms-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
const expect = chai.expect;

let hotel;
describe('Hotel', () => {
  beforeEach(() => {
    hotel = new Hotel(usersData, roomsData, bookingsData);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  // it('should have today\'s date', () => {
  //   expect(hotel.todaysDate).to.eql(moment().format('YYYY-MM-DD'));
  // });
  //
  // it('should except an array of users', () => {
  //   expect(hotel.users.length).to.eql(10);
  // });
  //
  // it('should except an array of rooms', () => {
  //   expect(hotel.rooms.length).to.eql(12);
  // });
  //
  // it('should except an array of bookings', () => {
  //   expect(hotel.rooms.length).to.eql(12);
  // });


});
