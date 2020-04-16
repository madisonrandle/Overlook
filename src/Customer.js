import $ from 'jquery'

class Customer {
  constructor(user, isManager = false) {
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
  }

  getAllBookings(rooms, bookings) {
    return bookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber && booking.userID === this.id) {
          acc.push(room);
        }
      })
      return acc;
    }, []);
  }
}
export default Customer;
