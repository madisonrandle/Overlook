import $ from 'jquery';
import moment from 'moment';

class Hotel {
  constructor(users, rooms, bookings, todaysDate) {
    this.todaysDate = moment().format('YYYY-MM-DD');
    this.users = users;
    this.rooms = rooms.rooms;
    this.bookings = bookings.bookings;
  }


}

export default Hotel;
