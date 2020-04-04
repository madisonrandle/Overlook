import chai from 'chai';
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

  it('should be a function', function() {
       expect(Hotel).to.be.a('function');
   });

  it('should be an instance of Hotel', function() {
   expect(hotel).to.be.an.instanceof(Hotel);
  });
});
