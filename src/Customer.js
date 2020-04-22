import $ from 'jquery';
import moment from 'moment';
import { fetchData } from './ApiHandler';

class Customer {
  constructor(user, isManager = false, todaysDate) {
    this.todaysDate = moment().format('YYYY/MM/DD');
    this.bookingDate = null;
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
    this.unavailableRooms = [];
    this.availableRooms = [];
  };

  getAllRoomBookings(bookings, user) {
    return bookings.filter(booking => booking.userID === user.id)
  };

  getPresentBookings(bookings, user) {
    let presentBookings = bookings.filter(booking => booking.date === this.todaysDate);
    return presentBookings.filter(presentBooking => user.id === presentBooking.userID)
  };

  getPastBookings(bookings, user) {
    let pastBookings = bookings.filter(booking => new Date(booking.date) < new Date(this.todaysDate));
    return pastBookings.filter(pastBooking => user.id === pastBooking.userID);
  };

  getFutureBookings(bookings, user) {
    let futureBookings = bookings.filter(booking => new Date(booking.date) > new Date(this.todaysDate));
    return futureBookings.filter(futureBooking => user.id === futureBooking.userID);
  };

  getTotalSpentOnBookings(allBookings, roomsData) {
    return allBookings.reduce((acc, booking) => {
      roomsData.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight;
        }
      });
      return acc;
    }, 0).toLocaleString("en-US", {style: "currency", currency: "USD"});
  };

  getAvailableRooms(rooms, bookings) {
    let bookingDate = $('#booking-date-input').val();
    this.bookingDate = moment(bookingDate).format('YYYY/MM/DD');
    rooms.forEach(room => {
      bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.date === this.bookingDate) {
          this.unavailableRooms.push(room);
        };
      });
    });
    rooms.forEach(room => {
      if (!this.unavailableRooms.includes(room)) {
        this.availableRooms.push(room)
      };
    });
  };

  getRoomByType(availableRooms, id) {
    return availableRooms.filter(room => room.roomType === id);
  };

  postBooking(e) {
    let options =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": this.id,
        "date": this.bookingDate,
        "roomNumber": parseInt(e.target.id)
      }),
    }
    fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', options);

    e.target.closest('div').remove();
  };

}
export default Customer;
