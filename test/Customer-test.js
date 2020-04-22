import chai from 'chai';
import moment from 'moment';
import $ from 'jquery';
import Customer from '../src/Customer';
import usersData from '../src/test-data/users-test-data';
import bookingsData from '../src/test-data/bookings-test-data';
import roomsData from '../src/test-data/rooms-test-data';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);


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

  it('should accept an array of unavailable rooms', () => {
    expect(customer.unavailableRooms).to.be.a('array');

  });

  it('should accept an array of availble rooms', () => {
    expect(customer.availableRooms).to.be.a('array');
  });

  it('should find all past, present, and future customer bookings', () => {
    expect(customer.getAllRoomBookings(bookingsData.bookings, customer).length).to.eql(4);

    expect(customer.getAllRoomBookings(bookingsData.bookings, customer)).to.deep.eql([
      {
        id: '5fwrgu4i7k55hl6tc',
        userID: 9,
        date: '2019/01/09',
        roomNumber: 9,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6td',
        userID: 9,
        date: '2020/05/31',
        roomNumber: 10,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6te',
        userID: 9,
        date: '2020/04/16',
        roomNumber: 11,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tf',
        userID: 9,
        date: '2020/04/16',
        roomNumber: 12,
        roomServiceCharges: []
      }
    ]);
  });

  it('should find all customer bookings for todays date', () => {
    let allRoomBookings = customer.getAllRoomBookings(bookingsData.bookings, customer);

    expect(customer.getPresentBookings(bookingsData.bookings, customer)).to.be.a('array');
    expect(customer.getPresentBookings(bookingsData.bookings, customer)).to.deep.eql([]);
  });

  it('should find all customer bookings prior to todays date', () => {
    let allRoomBookings = customer.getAllRoomBookings(roomsData.rooms, bookingsData.bookings);

    expect(customer.getPastBookings(bookingsData.bookings, customer)).to.deep.eql([
      {
        id: '5fwrgu4i7k55hl6tc',
        userID: 9,
        date: '2019/01/09',
        roomNumber: 9,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6te',
        userID: 9,
        date: '2020/04/16',
        roomNumber: 11,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tf',
        userID: 9,
        date: '2020/04/16',
        roomNumber: 12,
        roomServiceCharges: []
      }
    ]);
  });

  it('should find all customer bookings after today\'s date', () => {
    expect(customer.getFutureBookings(bookingsData.bookings, customer)).to.deep.equal([{
      id: '5fwrgu4i7k55hl6td',
      userID: 9,
      date: '2020/05/31',
      roomNumber: 10,
      roomServiceCharges: []
    }]);
  })

  it('should find a customer\'s total spending', () => {
    let allBookings = customer.getAllRoomBookings(bookingsData.bookings, customer);
    expect(customer.getTotalSpentOnBookings(allBookings, roomsData.rooms)).to.eql('$1,077.36');
  })

  it('should find available rooms by room type', () => {
    expect(customer.getRoomByType(customer.availableRooms, customer.id)).to.be.a('array');
  })


  // chai.spy.on(customer, 'getAvailableRooms', () => 'all available rooms');
  //
  //   it('Should invoke getAvailableRooms', () => {
  //
  //     // expect(customer.getAvailableRooms()).to.equal('all available rooms');
  //   });


    // ^^^^^ postBooking();
});
