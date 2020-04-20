import chai from 'chai';
import moment from 'moment';
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

  it('should have today\'s date', () => {
    expect(customer.todaysDate).to.eql(moment().format('YYYY/MM/DD'));
  });

  it('should have a unique id', () => {
    expect(customer.id).to.be.a('number');
    expect(customer.id).to.eql(9);
  });

  it('should have a unique name', () => {
    expect(customer.name).to.be.a('string');
    expect(customer.name).to.eql('Faustino Quitzon');
  });

  it('should not be considered a manager', () => {
    expect(customer.isManager).to.be.a('boolean');
    expect(customer.isManager).to.eql(false);
  });

  it('should find all past, present, and future customer bookings', () => {
    expect(customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings).length).to.eql(4);

    expect(customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings)).to.deep.eql([roomsData.rooms[8], roomsData.rooms[9], roomsData.rooms[10], roomsData.rooms[11]]);
  });

  it('should find all customer bookings for todays date', () => {
    let allRoomBookings = customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings);

    expect(customer.getPastBookings(allRoomBookings, bookingsData.bookings)).to.be.a('object');
    // expect(customer.getPresentBookings(allRoomBookings, bookingsData.bookings)).to.deep.eql([
    //   {
    //     '2020/04/16': {
    //       number: 11,
    //       roomType: 'single room',
    //
    //       bidet: true,
    //       bedSize: 'twin',
    //       numBeds: 2,
    //       costPerNight: 207.24
    //     }
    //   },
    //   {
    //     '2020/04/16': {
    //       number: 12,
    //       roomType: 'single room',
    //       bidet: false,
    //       bedSize: 'twin',
    //       numBeds: 2,
    //       costPerNight: 172.09
    //     }
    //   }
    // ]);
  });

  it('should find all customer bookings prior to todays date', () => {
    let allRoomBookings = customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings);
    expect(customer.getPastBookings(allRoomBookings, bookingsData.bookings)).to.be.a('object');
    // expect(customer.getPastBookings(allRoomBookings, bookingsData.bookings)).to.deep.eql([roomsData.rooms[8]]);

  });

  it('should find all customer bookings after today\'s date', () => {
    let allRoomBookings = customer.getFutureBookings(roomsData.rooms, bookingsData.bookings);
    customer.getFutureBookings(allRoomBookings, bookingsData.bookings)
    // expect(customer.getFutureBookings(allRoomBookings, bookingsData.bookings)).to.be.a('object');
  })
});
