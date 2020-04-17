import $ from 'jquery';
import moment from 'moment';

class Customer {
  constructor(user, isManager = false, todaysDate) {
    this.todaysDate = moment().format('YYYY/MM/DD');
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
  }

  getAllRoomBookings(rooms, bookings) {
    return bookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber && booking.userID === this.id) {
          acc.push(room);
        }
      })
      return acc;
    }, []);
  }

  getPresentBookings(allRoomBookings, bookings) {
    return bookings.reduce((acc, booking) => {
      allRoomBookings.forEach(roomBooking => {
        if (this.id === booking.userID && booking.date === this.todaysDate && booking.roomNumber === roomBooking.number) {
          let roomObj = {};
          roomObj[booking.date] = roomBooking;
          acc.push(roomObj);
        }
      })
      return acc;
    }, []);
  }

  getPastBookings(allRoomBookings, bookings) {
    let sortedBookings = bookings.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedBookings.reduce((acc, booking) => {
      if (new Date(booking.date) < new Date(this.todaysDate)) {
        allRoomBookings.forEach(roomBooking => {
          if (booking.roomNumber === roomBooking.number) {
            acc.push(roomBooking);
          }
        })
      }
      return acc;
    }, []);
  }
}
export default Customer;
