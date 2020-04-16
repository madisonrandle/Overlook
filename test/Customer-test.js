import chai from 'chai';
// import moment from 'moment';
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

  it.skip('should have todaysDate', () => {
    expect(customer.todaysDate).to.eql(moment().format('YYYY-MM-DD'));
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
    expect(customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings).length).to.eql(4);
    expect(customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings)).to.deep.eql([roomsData.rooms[2], roomsData.rooms[11], roomsData.rooms[7], roomsData.rooms[1]]);
  });

  it('should find all present bookings for todaysDate', () => {
    let allRoomBookings = customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings);
    expect(Object.values(customer.getPresentBookings(allRoomBookings, bookingsData.bookings)[0])).to.deep.eql([roomsData.rooms[2]]);
  });
});
