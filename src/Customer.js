import $ from 'jquery';
// import moment from 'moment';

class Customer {
  constructor(user, isManager = false) {
    this.todaysDate = '2020/01/09';
    // this.todaysDate = moment().format('YYYY/MM/DD');
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
      if (this.id === booking.userID && booking.date === '2020/01/09' && booking.roomNumber === roomBooking.number) {
      // if (this.id === booking.userID && booking.date === this.todaysDate) {
        let roomObj = {};
        roomObj[booking.date] = roomBooking;
        acc.push(roomObj);
      }
    })
    return acc;
  }, []);
}


}
export default Customer;
