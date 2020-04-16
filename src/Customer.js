import $ from 'jquery'

class Customer {
  constructor(user, isManager = false) {
    this.id = user.id;
    this.name = user.name;
    this.isManager = isManager;
  }

  getAllBookings(bookings) {
    return bookings.reduce((acc, booking) => {
      booking.userID === this.id && acc.push(booking);
      return acc;
    }, []);
  }
}
export default Customer;
